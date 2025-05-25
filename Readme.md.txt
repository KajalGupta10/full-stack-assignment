# Todo Summary Assistant 🚀  
A simple app to manage todos with AI summaries and Slack integration.  

## Features ✨  
- Add/Delete Todos  
- Generate AI summaries using Cohere  
- Send summaries to Slack  

## Tech Stack 💻  
- **Frontend**: React, Tailwind CSS  
- **Backend**: Node.js, Express  
- **Database**: Supabase  
- **APIs**: Cohere, Slack  

## Setup 🛠️  
1. Clone the repo:  
```bash  
git clone https://github.com/your-username/todo-summary-assistant.git  
```  

2. Install dependencies:  
```bash  
cd backend && npm install  
cd ../frontend && npm install  
```  

3. Create `.env` file in `backend` folder:  
```env  
SUPABASE_URL=your-url  
SUPABASE_KEY=your-key  
COHERE_API_KEY=your-cohere-key  
SLACK_WEBHOOK=your-slack-url  
```  

4. Start servers:  
```bash  
# Backend  
cd backend && node server.js  

# Frontend  
cd ../frontend && npm run dev  
```  

