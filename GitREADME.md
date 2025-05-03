# 🚀 How to Link GitHub with VS Code (The Super Simple Way!)

➡️ That just means:  
Open the VS Code Terminal and type that in, then press Enter.

You can open the terminal in VS Code by clicking:  
**Terminal > New Terminal** or pressing `Ctrl + ~`.

---

## 🎯 Step-by-Step Guide

**4️⃣ Connect to GitHub**  
Copy the HTTPS link from your GitHub repo (it looks like `https://github.com/yourusername/noirel-website.git`).

In the terminal, type:

bash  
`git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git`  
*(Replace with your actual link!)*

Example:

bash  
`git remote add origin https://github.com/johndoe/noirel-website.git`

---

**5️⃣ Add Your Files**  
In the terminal:

bash  
`git add .`  
✅ This tells Git, “Hey, I want to include ALL my files.”

---

**6️⃣ Make Your First Commit**  
Type:

bash  
`git commit -m "My first commit 🚀"`  
📝 This saves your work in Git’s memory.

---

**7️⃣ Push It to GitHub**  
Now send your code up to GitHub:

bash  
`git branch -M main`  
`git push -u origin main`  
🎉 Refresh your GitHub repo—you should see your files now!

---

## 🔄 How to Keep Pushing Updates

Every time you make changes:

1️⃣ Save your files.  
2️⃣ In the terminal:

bash  
`git add .`  
`git commit -m "Write what you changed here"`  
`git push`

Example:

bash  
`git commit -m "Added new products to shop page"`

---

## 🆕 How to Clone a GitHub Repo into VS Code

If your code is already on GitHub and you want to bring it to your computer:

- Copy the repo link from GitHub.
- In VS Code, open the terminal.
- Type:

bash  
`git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git`
