import { HfInference } from '@huggingface/inference';
import dotenv from 'dotenv';

dotenv.config();

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

// ■ DETERMINISTIC FALLBACK (Returns the same JSON structure as the AI)
const deterministicParse = (text) => {
    const commonSkills = [
        "javascript", "react", "node.js", "nodejs", "python", "java", "c++", "typescript",
        "html", "css", "sql", "mongodb", "express", "aws", "docker", "git", "github",
        "machine learning", "deep learning", "genai", "generative ai", "data analysis",
        "rest api", "tailwind", "redux", "next.js", "angular", "vue", "figma"
    ];
    
    // Find skills present in the resume
    const foundSkills = commonSkills.filter(skill => text.toLowerCase().includes(skill));
    // Find skills missing from the resume
    const missingSkills = commonSkills.filter(skill => !text.toLowerCase().includes(skill)).slice(0, 5);
    
    // Capitalize first letter for clean UI
    const formattedSkills = foundSkills.map(skill => skill.charAt(0).toUpperCase() + skill.slice(1));
    
    return {
        skills: formattedSkills,
        ats_score: formattedSkills.length > 0 ? 60 : 30, 
        missing_keywords: missingSkills,
        suggestions: "Consider adding more specific technical keywords and quantifiable achievements to improve ATS scoring."
    };
};

export const extractSkillsWithAI = async (resumeText) => {
    try {
        const prompt = `You are an expert ATS (Applicant Tracking System) resume scanner. 
Analyze the following resume text. Extract the skills, estimate an ATS-friendliness score (0-100) based on formatting and keyword clarity, list missing common technical keywords that could improve the resume, and provide a brief suggestion.

Return ONLY a valid JSON object with this EXACT structure, no extra text:
{
  "skills": ["skill1", "skill2"],
  "ats_score": 85,
  "missing_keywords": ["keyword1", "keyword2"],
  "suggestions": "A brief 1-sentence tip to improve this resume."
}

Resume Text:
 ${resumeText.substring(0, 2500)}`; 

        const response = await hf.textGeneration({
            model: "mistralai/Mistral-7B-Instruct-v0.2",
            inputs: prompt,
            parameters: { max_new_tokens: 300, temperature: 0.2, return_full_text: false }
        });

        let rawText = response.generated_text.trim();
        
        // ■ HACK: Clean up LLM markdown formatting (```json ... ```)
        if (rawText.startsWith("```json")) {
            rawText = rawText.slice(7, rawText.lastIndexOf("```")).trim();
        } else if (rawText.startsWith("```")) {
            rawText = rawText.slice(3, rawText.lastIndexOf("```")).trim();
        }

        const parsed = JSON.parse(rawText);
        
        // Validate structure
        if (!parsed.skills || !parsed.ats_score) throw new Error("Invalid JSON structure");
        
        return parsed;

    } catch (error) {
        console.log("■ AI Parsing failed, using deterministic fallback:", error.message);
        return deterministicParse(resumeText); // FAILSAFE
    }
};