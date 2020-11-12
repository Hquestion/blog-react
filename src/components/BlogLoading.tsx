import React from 'react';
import { LoadingOutlined } from '@ant-design/icons'

const BlogLoading = (props: any) => {
    return (
        <div className="blog-loading text-blue-500 text-center container mx-auto text-4xl font-hairline py-64">
            <LoadingOutlined />
        </div>
    );
}

export default BlogLoading;
