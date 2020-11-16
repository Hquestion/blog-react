import React, {useEffect, useState} from "react";
import {Upload} from "antd";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";

interface IBlogUploadProp {
    sourceImg?: string,
    onUpload: Function
}

const BlogUpload = (props: IBlogUploadProp) => {
    const [img, setImage] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const { onUpload, sourceImg } = props;
    useEffect(() => {
        if (sourceImg) {
            setImage(sourceImg);
        }
    }, [sourceImg]);

    const uploadButton = (
        <div>
            {isUploading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>上传图片</div>
        </div>
    );

    const handleLogoUpload = (info: any) => {
        if (info.file.status === 'uploading') {
            setIsUploading(true);
            return;
        }
        if (info.file.status === 'done') {
            setIsUploading(false);
            onUpload(info.file.response);
        }
    }

    return (
        <Upload
            name="files"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="/api/v1/common/upload"
            onChange={handleLogoUpload}
        >
            {img ? <img src={img} alt="cover" /> : uploadButton}
        </Upload>
    )
};

export default BlogUpload;
