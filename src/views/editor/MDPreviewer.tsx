import React, {useState, useEffect, forwardRef} from "react";
import marked from "marked";
import hljs from 'highlight.js';
require('github-markdown-css');
require('./md-previewer.scss');
require('highlight.js/styles/dark.css');

marked.setOptions({
    renderer: new marked.Renderer(),
    // gfm: true,
    pedantic: false,
    sanitize: false,
    breaks: true,
    smartLists: true,
    smartypants: true,
    langPrefix: 'hljs',
    highlight: function (code, lang) {
        return lang ? hljs.highlight(lang, code).value : hljs.highlightAuto(code).value;
    }

});

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
