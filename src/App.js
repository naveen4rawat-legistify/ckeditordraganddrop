import React from "react";
import CKEditor from "@ckeditor/ckeditor5-react";

// NOTE: We use editor from source (not a build)!
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";

import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import HCardEditing, { contacts } from "./HCardEditing";
import "./App.css";

const editorConfiguration = {
  plugins: [Essentials, Bold, Italic, Paragraph, HCardEditing],

  toolbar: ["bold", "italic"],
};

const App = () => {
  const handleDragStart = (event) => {
    const target = event.target.nodeType === 1 ? event.target : event.target.parentElement;
    const draggable = target.closest("[draggable]");
    event.dataTransfer.setData("text/plain", draggable.innerText);
    event.dataTransfer.setData("text/html", draggable.innerText);
    event.dataTransfer.setData("contact", JSON.stringify(contacts[draggable.dataset.contact]));
    event.dataTransfer.setDragImage(draggable, 0, 0);
  };
  return (
    <div className="App">
      <div>
        <h2>Using CKEditor 5 from source in React</h2>
        <CKEditor
          editor={ClassicEditor}
          config={editorConfiguration}
          data="<p>Hello from CKEditor 5!</p>"
          onReady={(editor) => {
            console.log("Editor is ready to use!", editor);
          }}
        />
      </div>
      <ul id="contacts">
        {contacts.map((item, index) => (
          <li key={index}>
            <span style={{ cursor: "pointer" }} className="contact h-card" data-contact={index} onDragStart={handleDragStart} draggable="true">
              <img height="20px" src="https://contract-frontend-dev.legistrak.com/static/media/logo_black_mini.c83a7460.svg" alt="avatar" className="u-photo" draggable="false" />
              {item.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
