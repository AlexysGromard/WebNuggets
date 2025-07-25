import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import '../styles/readme.css';

function Readme() {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'assets/README.md')
      .then((res) => res.text())
      .then(setContent);
  }, []);

  return (
    <>
      <div className="react-markdown">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </>
  )
}

export default Readme;
