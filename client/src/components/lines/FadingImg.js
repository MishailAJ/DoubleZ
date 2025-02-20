import React from 'react';
import "../../css/component_styles/Block.css";

/** 
 * Компонент исчезающей картинки.
 * 
 * Пример использования:
 * ```
    <FadingImg
        imgPos="left"
        imgSrc={ImportedImage}
    />
 * ```
 * Данный код задаёт картинку, имеющую эффект исчезновения с левой стороны, источник которой - это объект ImportedImage.
 * 
 * Props:
 * @param {Object | string} imgSrc - изображение (либо импортированное, либо путь к нему).
 * @param {"left" | "right"} imgPos - в какой части картинки будет эффект исчезновения (left, right).
*/
class FadingImg extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <img 
                src={this.props.imgSrc} 
                className={`FadingImg-${this.props.imgPos}`}
            />
        );
    }
}

export default FadingImg;