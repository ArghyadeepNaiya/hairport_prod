const fs = require('fs');
const lines = fs.readFileSync('/home/orstead/.gemini/antigravity/brain/67ffe622-4a66-4421-9987-ddeb22ef3abf/.system_generated/logs/transcript.jsonl', 'utf-8').split('\n');
for (let i = lines.length - 1; i >= 0; i--) {
    if (!lines[i]) continue;
    try {
        const step = JSON.parse(lines[i]);
        if (step.tool_calls) {
            for (const call of step.tool_calls) {
                if (call.arguments && call.arguments.TargetFile && call.arguments.TargetFile.includes('index.ejs')) {
                    console.log(`Found tool call: ${call.tool_name} at step ${step.step_index}`);
                    // If it was write_to_file we could get the content
                }
            }
        }
    } catch(e) {}
}
