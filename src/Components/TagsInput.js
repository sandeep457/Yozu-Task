import React from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

function TagsInput({ childToParent }) {
    const [tags, setTags] = useState([])

    function handleKeyDown(e) {
        if (e.key !== 'Enter') return
        const value = e.target.value
        if (!value.trim()) return
        setTags([...tags, value])
        childToParent([...tags, value])
        e.target.value = ''
    }

    function removeTag(index) {
      setTags(tags.filter((el, i) => i !== index))
      childToParent(tags.filter((el, i) => i !== index))
    }

    return (
        <div className="tags-input-container">
            {tags.map((tag, index) => (
                <div className="tag-item" key={index}>
                    <span className="text">{tag}</span>
                    <span className="close" onClick={() => removeTag(index)}><FontAwesomeIcon icon={faTimesCircle}/></span>
                </div>
            ))}
            <input onKeyDown={handleKeyDown} type="text" className="tags-input" placeholder="Type something..." />
        </div>
    )
}

export default TagsInput