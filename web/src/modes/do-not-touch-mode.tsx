import React, { FC } from 'react';

type DoNotTouchProps = {
    gridSize: number
}

export const DoNotTouch: FC<DoNotTouchProps> = (props) => {
    const { gridSize } = props;

    return (
        <div>
            <h1>Do not touch this file</h1>
            <p>
                This file is not part of the challenge. It is a placeholder file to prevent you from accidentally modifying the wrong file.
            </p>
        </div>
    );
}
