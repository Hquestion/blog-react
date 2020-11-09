import React from "react";
import classNames from "classnames";
import '../../assets/style/CategoryItem.scss';

declare type ICategoryProp = {
    uuid: string,
    title?: string,
    active?: boolean,
    onClick: () => void
}

function CategoryItem(props: ICategoryProp) {
    const categoryClass = classNames({
        'category-item inline-block px-2 hover:text-blue-400 cursor-pointer': true,
        active: !!props.active
    });
    return (
        <div className={categoryClass } onClick={props.onClick}>
            {props.title}
        </div>
    );
}

export default CategoryItem;
