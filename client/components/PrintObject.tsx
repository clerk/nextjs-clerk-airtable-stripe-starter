import React from 'react';

type PrintObjectProps = {
    content: object
};

const PrintObject = ({content}: PrintObjectProps) => {
    const formattedContent: string = JSON.stringify(content, null, 2)
    return <pre>{formattedContent}</pre>;
}

export default PrintObject;
