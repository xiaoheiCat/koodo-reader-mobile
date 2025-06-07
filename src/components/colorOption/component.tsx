import React from "react";
import "./colorOption.css";
import { ColorProps, ColorStates } from "./interface";
import { ConfigService } from "../../assets/lib/kookit-extra-browser.min";

class ColorOption extends React.Component<ColorProps, ColorStates> {
  constructor(props: ColorProps) {
    super(props);
    this.state = {
      isLine: this.props.color > 3 ? true : false,
    };
  }
  handleChangeOption = () => {
    this.setState({ isLine: !this.state.isLine });
  };
  render() {
    const renderLine = () => {
      return ["#FF0000", "#000080", "#0000FF", "#2EFF2E", "#000000", "#FFFFFF"].map((item, index) => {
        return (
          <div
            className="line-option"
            style={{
              border: `${this.props.color === index + 4 ? "" : "2px"}`,
              animation: `${this.props.isEdit ? undefined : ""}`,
            }}
            key={item}
            onClick={() => {
              this.props.handleColor(index + 4);
              ConfigService.setReaderConfig(
                "highlightIndex",
                (index + 4).toString()
              );
              setTimeout(() => {
                this.props.handleDigest();
              }, 100);
            }}
          >
            <div
              className="demo-line"
              style={{ borderBottom: `solid 2px ${item}` }}
            ></div>
          </div>
        );
      });
    };
    const renderColor = () => {
      return ["#FEF3CD", "#EFEEB0", "#CAEFC9", "#76BEE9", "#FFFFFF", "#000000"].map((item, index) => {
        return (
          <div
            className="color-option"
            style={{
              backgroundColor: item,
              border: `${this.props.color === index ? "" : "0px"}`,
              animation: `${this.props.isEdit ? undefined : ""}`,
              // 为纯白色添加边框以便可见
              ...(item === "#FFFFFF" ? { border: "1px solid #000000" } : {}),
            }}
            key={item}
            onClick={() => {
              this.props.handleColor(index);
              ConfigService.setReaderConfig("highlightIndex", index.toString());
              setTimeout(() => {
                this.props.handleDigest();
              }, 100);
            }}
          ></div>
        );
      });
    };
    return (
      <div
        className="color-option-container"
        style={
          this.props.isEdit
            ? {
                position: "absolute",
                top: "calc(100% - 65px)",
                width: "70%",
                marginLeft: 0,
              }
            : {}
        }
      >
        {this.props.isEdit ? (
          <>
            {renderColor()}
            {renderLine()}
          </>
        ) : (
          <>
            {!this.state.isLine && renderColor()}
            <span
              className="icon-sort popup-color-more"
              onClick={() => {
                this.handleChangeOption();
              }}
            ></span>
            {this.state.isLine && renderLine()}
          </>
        )}
      </div>
    );
  }
}

export default ColorOption;
