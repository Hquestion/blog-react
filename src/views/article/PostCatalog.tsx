import React, {useEffect, useRef, useState} from "react";
import { v4 as uuid } from 'uuid';
import useSticky from "../../utils/useSticky";

interface IPostCatalogProp {
    code: string
}
interface ILevel {
    id: string,
    targetId: string,
    level: number,
    title: string,
    children: ILevel[]
}

const reg = /(#+)[ ]+([^\\n\r#])+/g;
const levelReg = /(#+)[ ]+(.+)/;

const PostCatalog = (props: IPostCatalogProp) => {
    const { code } = props;
    const [catalog, setCatalog]: [ILevel[], Function] = useState([]);
    const ref = useRef();
    useSticky(ref, 100);
    useEffect(() => {
        if(!code) {
            setCatalog([]);
            return;
        }
        const list = JSON.stringify(code).match(reg);
        const levelTree: ILevel[] = [];
        let lastParents: ILevel[] = [];
        if (list) {
            list.forEach((item) => {
                item.replace(levelReg, '$1, $2');
                const level = (window as any).RegExp.$1;
                const name = (window as any).RegExp.$2;
                const levelObj = {
                    id: uuid(),
                    targetId: name.trim().replace(/ /g, '-'),
                    level: level.length,
                    title: name,
                    children: []
                };
                if (lastParents.length > 0) {
                    let lastParent: ILevel = lastParents[lastParents.length - 1];
                    if (lastParent.level >= level.length) {
                        while (lastParent && lastParent.level >= level.length) {
                            lastParents.pop();
                            lastParent = lastParents[lastParents.length - 1];
                        }
                        if (lastParent) {
                            lastParent.children.push(levelObj);
                        } else {
                            levelTree.push(levelObj);
                        }
                        lastParents.push(levelObj);
                    } else {
                        lastParent = lastParents[lastParents.length - 1];
                        lastParent.children.push(levelObj);
                        lastParents.push(levelObj);
                    }
                } else {
                    levelTree.push(levelObj);
                    lastParents.push(levelObj);
                }
            })
            setCatalog(levelTree);
        }
    }, [code]);

    const CatalogItem = (data: {catalog: ILevel}) => (
        <li className="catalog-item text-base font-medium">
            <a href={'#' + data.catalog.targetId}>{data.catalog.title}</a>
            <ul className="catalog-children px-4 list-disc">
                {
                    data.catalog.children.map(item => (
                        <CatalogItem catalog={item} key={item.id} />
                    ))
                }
            </ul>
        </li>
    )

    return (
        <div className="p-4 sticky" ref={ref as any}>
            <ul className="list-disc">
                {
                    catalog.map((item) => (
                        <CatalogItem catalog={item} key={item.id} />
                    ))
                }
            </ul>
        </div>
    );
}

export default PostCatalog;
