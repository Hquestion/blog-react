import React, { useEffect, useState } from 'react';
import { BorderHorizontalOutlined, FileMarkdownOutlined, FileImageOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { Controlled as CodeMirrorControlled} from 'react-codemirror2';
import * as codemirror from 'codemirror';
import {Resizable} from 're-resizable';
import ForwardedMDPreviewer from "./MDPreviewer";
require('codemirror/mode/markdown/markdown');
require('codemirror/lib/codemirror.css');
require('../../assets/style/MDEditor.scss');

interface IProps {
    code?: string;
    updateCode: (code: string) => any;
    upload: (blob: Blob) => Promise<string>;
}

interface Clipboard2 extends Clipboard{
    writeText(newClipText: string): Promise<void>;
    read: () => Promise<ClipboardItems>;
}

interface NavigatorClipboard {
    readonly clipboard: Clipboard2;
}

interface Navigator2 extends NavigatorClipboard {}

enum modes {
    ALL,
    CODE,
    PREVIEW
}

function MdEditor(props: IProps) {
    const ref: React.RefObject<any> = useState(React.createRef())[0];
    const previewerRef: React.RefObject<any> = useState(React.createRef())[0];
    let [code, setCode]: [string, Function] = useState(props.code || '');
    const [editor, setEditor]: [codemirror.Editor | null, Function] = useState(null);
    let [mode, setMode]: [modes, Function] = useState(modes.ALL);
    let [maxWidth, setMaxWidth]: [number, Function] = useState((ref.current && ref.current.clientWidth - 100) || 1000);
    const [width, setWidth] : [string, Function] = useState('50%');
    const [resizable, setResizable] = useState(true);
    const [widthBeforeHidden, setWidthBeforeHidden]: [string, Function] = useState(width);

    usePaste(code, editor, props.upload, function(result: string) {
        setCode(result);
    });

    useEffect(() => {
        const width = ref.current.clientWidth;
        setMaxWidth(mode === modes.CODE ? width : width - 100);
    }, [setMaxWidth, ref, mode]);

    function handleBeforeChange(editor: codemirror.Editor, data: codemirror.EditorChange, e: string) {
        setCode(e);
    }

    function handleChange(editor: codemirror.Editor, data: codemirror.EditorChange, e: string) {
        props.updateCode(e);
    }

    function handleEditorMount(editor: codemirror.Editor) {
        setEditor(editor);
    }

    function handleCursorActivity(editor: codemirror.Editor) {
        if (previewerRef && previewerRef.current) {
            const cursorPosition = editor.getCursor();
            const lineCount = editor.lineCount();
            const progress = cursorPosition.line / lineCount;
            const scrollHeight = previewerRef.current.scrollHeight;
            previewerRef.current.scrollTo({
                top: progress * scrollHeight,
                left: 0,
                behavior: 'smooth'
            });
        }
    }

    const opts: codemirror.EditorConfiguration = {
        lineNumbers: true,
        mode: 'markdown'
    }

    const getIconClass = (type: modes) => {
        return classNames({
            'is-active': type === mode,
            'icon': true
        });
    }

    function toggleMode(checked: modes) {
        setMode(checked);
        if (checked === modes.CODE) {
            setWidthBeforeHidden(width);
            setWidth('100%');
            setResizable(false);
        } else {
            checked === modes.ALL && setWidth(widthBeforeHidden);
            setResizable(true);
        }
    }

    const editorVisible: () => boolean = () => mode !== modes.PREVIEW;
    const previewVisible: () => boolean = () => mode !== modes.CODE;

    return (
        <div className="md-editor-wrapper w-full border bg-white" ref={ref}>
            <div className="toolbar h-8 bg-white border-b py-1 px-2 flex justify-start items-center text-lg">
                <div className={getIconClass(modes.ALL)} onClick={() => toggleMode(modes.ALL)}>
                    <BorderHorizontalOutlined />
                </div>
                <div className={getIconClass(modes.CODE)} onClick={() => toggleMode(modes.CODE)}>
                    <FileMarkdownOutlined />
                </div>
                <div className={getIconClass(modes.PREVIEW)} onClick={() => toggleMode(modes.PREVIEW)}>
                    <FileImageOutlined />
                </div>
            </div>
            <div className="editor-wrapper bg-white flex justify-start items-start">
                {
                    (editorVisible()) && (
                        <Resizable
                            enable={{right: resizable}}
                            size={{width, height: '100%'}}
                            minWidth={100}
                            maxWidth={maxWidth}
                            onResizeStop={(e, direction, ref) => {
                                setWidth(ref.clientWidth + 'px');
                            }}
                        >
                            <CodeMirrorControlled
                                className="md-mirror border-r"
                                value={code}
                                onBeforeChange={handleBeforeChange}
                                onChange={handleChange}
                                editorDidMount={handleEditorMount}
                                options={opts}
                                onCursorActivity={handleCursorActivity}
                            />
                        </Resizable>
                    )
                }
                {
                    previewVisible() && <ForwardedMDPreviewer classes="h-full flex-1" value={code} ref={previewerRef} />
                }
            </div>
        </div>
    )
}

function usePaste(code: string, editor: codemirror.Editor | null, upload: (blob: Blob) => Promise<string>, callback: Function) {
    useEffect(() => {
        function pasteHandler() {
            (window.navigator as unknown as Navigator2).clipboard.read().then(data => {
                data.forEach((item) => {
                    item.types.forEach( (type: string) => {
                        if (/^image\/.*/.test(type)) {
                            item.getType(type).then((blob: Blob) => {
                                clipboard2md(blob);
                            });
                        }
                    })
                })
            });
        }
        function clipboard2md(blob: Blob): void {
            upload(blob).then((res) => {
                const appendedCode = code + `![image](${res})`;
                callback(appendedCode);
            });
        }
        if (!editor) return;
        (editor as codemirror.Editor).on('paste', pasteHandler);
        return () => (editor as codemirror.Editor).off('paste', pasteHandler);
    }, [editor, code, upload, callback]);
}

export default MdEditor;
