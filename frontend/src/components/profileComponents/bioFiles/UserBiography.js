import React, {
  useEffect,
  useMemo,
  useState,
  useRef,
  createContext,
} from "react";
import "./UserBio.css";
import "../../../styles/CommonStyles.css";
import EmojiPicker from "./EmojiPicker";
import SlateInput from "./SlateInput";
import { Transforms, createEditor } from "slate";
import { useSlate, withReact, Slate } from "slate-react";
export const EventContext = createContext();

export const OverLay = ({ showPicker }) => {
  const editor = useSlate();
  const [showEmojiOverLay, setShowEmojiOverLay] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const overLayRef = useRef(null);

  const handleClickOutside = (e) => {
    const clickedElement = e.target;
    if (
      overLayRef.current &&
      !overLayRef.current.contains(e.target) &&
      !clickedElement.closest("#outerTxtInput")
    ) {
      setShowEmojiOverLay(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleEmojiOverLayClick = () => {
    setShowEmojiOverLay(!showEmojiOverLay);
  };

  //send message
  const onMessageSubmit = async (messages) => {
    console.log(messages);
  };

  const onEmojiSelect = (emoji) => {
    console.log("Emoji selected: ", emoji);
    const text = { text: emoji };
    Transforms.insertNodes(editor, text);
    setSelectedEmoji(emoji);
  };

  return (
    <div id="customOverLay">
      <div id="customOverLayInner">
        <div ref={overLayRef}>
          <div id="customOverLayInnerButtons" onClick={handleEmojiOverLayClick}>
            <div className="displayFlex smallIcon customIcon" id="done">
              <div id="emoji"></div>
            </div>
            <div className="displayFlex smallIcon customIcon" id="close">
              <span className="material-icons customIconStyle">close</span>
            </div>
          </div>
          {showEmojiOverLay && (
            <div className="custom-emoji-overlay">
              <EmojiPicker onEmojiSelect={onEmojiSelect} />
            </div>
          )}
        </div>
      </div>
      <div>
        <EventContext.Provider
          value={{ showEmojiOverLay, selectedEmoji, setSelectedEmoji }}
        >
          <SlateInput onMessageSubmit={onMessageSubmit} />
        </EventContext.Provider>
      </div>
    </div>
  );
};

const UserBio = ({ tempTheme, colorKey }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [bio, setBio] = useState(
    "This is the start of a new journey \n      filled with twists and turns 😊"
  );

  const colorPickerRef = useRef(null);
  const editor = useMemo(() => withReact(createEditor()), []);

  const handleClickOutside = (e) => {
    if (colorPickerRef.current && !colorPickerRef.current.contains(e.target)) {
      setShowPicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleColorPickerClick = () => {
    setShowPicker(!showPicker);
  };

  const [editorValue, setEditorValue] = useState([
    {
      type: "paragraph",
      children: [
        {
          text: "This is the start of a new journey filled with twists and turns 😊",
        },
      ],
    },
  ]);

  return (
    <div>
      <div className="displayFlex height50 alighnItemsCenter">
        <div className="width100">User Bio:</div>
        <div ref={colorPickerRef} id="colorPickerContainer">
          <div className="color-picker-input" onClick={handleColorPickerClick}>
            <span className="material-icons custom-icon-style">
              text_fields
            </span>
            <div className="displayFlex smallIcon customIcon">
              <span className="material-icons customIconStyle" id="pencil">
                edit
              </span>
            </div>
          </div>
          {showPicker && (
            <div className="custom-overlay">
              <Slate
                editor={editor}
                value={editorValue}
                onChange={setEditorValue}
              >
                <OverLay showPicker={showPicker} bio={bio} setBio={setBio} />
              </Slate>
            </div>
          )}
        </div>
      </div>
      <div style={{ opacity: "0.4", padding: "25px", paddingTop: "10px" }}>
        This is the start of a new journey filled with twists and turns 😊
      </div>
    </div>
  );
};

export default UserBio;
