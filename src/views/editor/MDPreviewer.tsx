import React, {useState, useEffect, forwardRef} from "react";
import marked from "marked";
require('github-markdown-css');
require('./md-previewer.scss');

export interface IPreviewerProps {
    value: string,
    classes?: string
}

const ForwardedMDPreviewer = forwardRef((props: IPreviewerProps, ref: any) => {
    const [mdHtml, setMDHtml] = useState('');

    useEffect(() => {
        setMDHtml(marked(props.value));
    }, [props.value]);

    return (
        <div
            className={"md-previewer markdown-body px-2 py-2 " + props.classes || ''}
            ref={ref}
            dangerouslySetInnerHTML={{__html: mdHtml}}
        />
    );
})

export default ForwardedMDPreviewer;
