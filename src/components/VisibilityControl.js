import React from "react";

export const VisibilityControl = props => {
    return (
        <div className="form-check">
            <input 
                type="checkbox" 
                className="form-check-inputs"
                checked={props.isChecked}
                onChange={e => props.callback(e.target.checked)}
            />

            <label className="form-check-label p-2">
                Show  {props.description}
            </label>
        </div>
    )
}