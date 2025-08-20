import { useState,useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import Editor from "react-simple-code-editor"
import axios from 'axios';
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; 
import './App.css'



function App() {
  const [count, setCount] = useState(0)
  const [code, setCode] = useState(`function add(a, b) {
  return a + b;
}`);

const [review, setReview] = useState(``);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode(code) {
     const response = await axios.post("https://syntax-sage-bzzq.onrender.com/ai/get-review", { code });
     setReview(response.data);
  } 

  return (
    <>
    <main>
      <div className="title">
        <div className="header">
          <h1>Syntax Sage – AI Code Reviewer</h1>
        </div>
        <div className="content">
          <div className="left">
            <div className="code" placeholder="Your code goes here..."  >
              <Editor
                value={code}
                onValueChange={setCode}
                highlight={code => prism.highlight(code, prism.languages.javascript, 'javascript')}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 16,
                  // border: "1px solid #383737",
                  borderRadius: "1px",
                  height: "100%",
                  width: "100%",
                  minHeight: "100%",
                  whiteSpace: 'pre',
                  lineHeight: '1.5',
                  overflow: 'auto',
                  caretColor: 'white',
                  outline: 'none',
                  position: 'relative',
                  backgroundColor: 'transparent',
                   
                }}

              />
            </div>
            <div onClick={() => reviewCode(code)} className="button">Review</div>
          </div>
          <div className="right">
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          </div>
        </div>
      </div>
    </main>

    </>
  )
}

export default App
