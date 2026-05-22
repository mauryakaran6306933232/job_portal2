import { getDocumentProxy, extractText } from 'unpdf';
import { extractSkillsWithAI } from '../utils/aiParser.js';

export const parseResumeAI = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }
        
        // 1. Extract raw text from the uploaded PDF buffer using unpdf
        const pdf = await getDocumentProxy(new Uint8Array(req.file.buffer));
        const extracted = await extractText(pdf);

        // THE FIX: unpdf returns an array of pages. We join them into one string.
        const resumeText = Array.isArray(extracted.text)
            ? extracted.text.join(' ')
            : String(extracted.text || '');
            
        if (!resumeText || resumeText.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: "Could not read text from PDF. It might be an image-based or scanned PDF."
            });
        }

        console.log("■ PDF Text Extracted! Sending to AI for ATS Analysis...");
        
        // 2. Send text to Hugging Face AI (Now returns rich JSON)
        const analysisResult = await extractSkillsWithAI(resumeText);

        return res.status(200).json({
            success: true,
            message: "Resume analyzed successfully",
            analysis: analysisResult, // Contains { skills, ats_score, missing_keywords, suggestions }
            rawTextPreview: resumeText.substring(0, 300) // Send a tiny preview for debugging
        });
    } catch (error) {
        console.error("Resume Parse Error:", error);
        return res.status(500).json({
            success: false,
            message: `AI Parsing failed: ${error.message}`
        });
    }
};