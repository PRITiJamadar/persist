import React from 'react';

const Blogs = () => {
    const element = <a href="https://support.hpe.com/connect/s/?language=en_US" target="_blank">Click Here</a>;

    return (
        <div>
            <h1>You can write your blogs</h1>
            {element}
        </div>
    );
};

export default Blogs;