import React, {useState} from 'react';
import useAxios from "../../utils/useAxios";
import CategoryItem from './CategoryItem';

function BlogCategory() {
    const [active, setActive] = useState('-1');
    const data = useAxios('/category');

    return (
        <div className="blog-category bg-white h-10 shadow-md">
            <div className="container mx-auto h-full flex items-center justify-start">
                <CategoryItem
                    key={-1}
                    title="最新"
                    uuid="-1"
                    active={active === '-1'}
                    onClick={() => setActive('-1')}
                />
                {
                    data.result && data.result.map((item: any) => (
                        <CategoryItem
                            key={item.uuid}
                            uuid={item.uuid}
                            title={item.title}
                            active={active === item.uuid}
                            onClick={() => setActive(item.uuid)}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default BlogCategory;
