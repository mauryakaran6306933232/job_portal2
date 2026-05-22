import Job from "../models/job.model.js";
import redisClient from "../utils/redis.js"; // 🔥 IMPORT REDIS

export const advancedJobSearch = async (req, res) => {
    try {
        const { keyword, location, jobType, salaryMin, salaryMax } = req.query;
        
        // 🔥 REDIS CACHING LOGIC 🔥
        // Create a unique cache key based on the exact search query
        const cacheKey = `jobs:${keyword || ""}:${location || ""}:${jobType || ""}:${salaryMin || ""}:${salaryMax || ""}`;

        // 1. Check if data exists in Redis Cache
        const cachedJobs = await redisClient.get(cacheKey);
        if (cachedJobs) {
            console.log("⚡ Served from Redis Cache!");
            return res.status(200).json({
                success: true,
                message: "Advanced search successful (Cached)",
                jobs: JSON.parse(cachedJobs)
            });
        }

        // 2. If NOT in cache, query MongoDB
        let pipeline = [{ $match: {status: 'published'} }];

        if (keyword) {
            pipeline.push({
                $match: {
                    $or: [
                        { title: { $regex: keyword, $options: "i" } },
                        { description: { $regex: keyword, $options: "i" } }
                    ]
                }
            });
        }

        if (location) {
            pipeline.push({ $match: { location: { $regex: location, $options: "i" } } });
        }

        if (jobType) {
            const types = jobType.split(',');
            pipeline.push({ $match: { jobType: { $in: types } } });
        }

        if (salaryMin || salaryMax) {
            let salaryMatch = {};
            if (salaryMin) salaryMatch.$gte = Number(salaryMin);
            if (salaryMax) salaryMatch.$lte = Number(salaryMax);
            pipeline.push({ $match: { salary: salaryMatch } });
        }

        pipeline.push(
            { $sort: { createdAt: -1 } },
            { $lookup: { from: "companies", localField: "company", foreignField: "_id", as: "company" } },
            { $unwind: { path: "$company", preserveNullAndEmptyArrays: true } }
        );

        const jobs = await Job.aggregate(pipeline);

        // 3. Save the MongoDB result to Redis Cache for 5 minutes (300 seconds)
        await redisClient.setEx(cacheKey, 300, JSON.stringify(jobs));
        console.log("🗄️ Served from MongoDB & Cached in Redis!");

        return res.status(200).json({
            success: true,
            message: "Advanced search successful",
            jobs
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Advanced search error: ${error.message}`
        });
    }
};