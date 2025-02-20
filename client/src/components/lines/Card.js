import React from "react";
import FadingImg from "./FadingImg";
import RoundedImg from "./RoundedImg";
import "../../css/component_styles/Block.css";

/** 
 * Компонент линии вида "Карточка". Она содержит изображение (слева или справа) и часть с основным контентом.
 * 
 * Пример использования:
 * ```
    <Card 
        imgPos='left'
        imgType='fading'
        imgSrc={ImportedImage}
    >
        <div>
            <h1>Title</h1>
            <p>Some content...</p>
        </div>
    </Card>
 * ```
 * Данный код задаёт карточку с изображением ImportedImage, расположенным слева ("left"). 
 * У изображения будет установлен эффект исчезновения ("fading").
 * Контент передаётся как дочерние элементы.
 * 
 * Props:
 * @param {File | string} imgSrc - изображение, которое помещается в отведённое для него место (либо импортированное, либо путь к нему). Можно не указывать, если imgPos="none".
 * @param {"left" | "right"} imgPos - позиция изображения в карточке (top, right, bottom, left, none). imgPos="none" указывает на отсутствие изображения.
 * @param {"fading" | "rounded" | "normal"} imgType - тип изображения: fading - исчезающее, rounded - круглое, normal - без эффектов.
*/

class Card extends React.Component {
    // Значени пропов по умолчанию (если они не были переданы)
    static defaultProps = {
        className: '',
        imgPos: 'left',
        imgType: 'fading',
    }

    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div 
                className={`Card Card-${this.props.imgPos} ${this.props.className}`} 
                style={{...this.props.style}}
            >
                <div className={`Card-image Card-image-${this.props.imgPos}` + (this.props.imgType === 'rounded' ? ' Card-image-rounded' : "")}>
                {
                    {
                        'fading':   <FadingImg
                                        imgPos={this.props.imgPos}
                                        imgSrc={this.props.imgSrc}
                                    />,
                        'rounded':  <RoundedImg   
                                        imgSrc={this.props.imgSrc}
                                    />,
                        'normal':   <img
                                        src={this.props.imgSrc} style={{borderRadius: "var(--default_border_radius)"}} align={this.props.imgPos}
                                    />,
                    }[this.props.imgType]
                }
                </div>
                <div className={`Card-body Card-body-${this.props.imgPos}`}>
                    {
                        this.props.title && 
                        
                        <h1>{this.props.title}</h1>
                    }
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Card;