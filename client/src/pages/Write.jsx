import React, { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Write(){
    const [value, setValue] = useState('');

    const modules = {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'header': 1 }, { 'header': 2 }],
        ['blockquote', 'code-block','image'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }],
        [{ 'font': ['Times-New-Ro'] }],
        [{ 'align': [] }],
        ['clean'],
      ],
    };

    return (
        <div className="add">
          <div className="content">
            <input type="text" placeholder="Title"/>
            <div className="editorContainer">
                <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} modules={modules} />
                {console.log(value)}
            </div>
          </div>

          <div className="menu">

            <div className="item">
              <h1>Category</h1>
              <div className="cat">
                <input type="radio" name="cat" value="art" id="art"/>
                <label htmlFor="art">Art</label>
              </div>

              <div className="cat">
                <input type="radio" name="cat" value="science" id="science"/>
                <label htmlFor="science">Science</label>
              </div>

              <div className="cat">
                <input type="radio" name="cat" value="technology" id="technology"/>
                <label htmlFor="technology">Technology</label>
              </div>

              <div className="cat">
                <input type="radio" name="cat" value="travel" id="travel"/>
                <label htmlFor="cinema">Trave</label>
              </div>

              <div className="cat">
                <input type="radio" name="cat" value="event" id="event"/>
                <label htmlFor="design">Event</label>
              </div>

              <div className="cat">
                <input type="radio" name="cat" value="food" id="food"/>
                <label htmlFor="food">Food</label>
              </div>
            </div>
            
            <div className="buttons">
                <button>Publish</button>
            </div>
          </div>    
        </div>
    );
};

export default Write;