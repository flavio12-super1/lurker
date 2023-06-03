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

const EmojiSelector = () => {
  const textareaRef = useRef(null);
  const [emojiOptions] = useState(["😊", "🎉", "🌟"]); // Add more emoji options as needed

  const insertEmoji = (emoji) => {
    const textarea = textareaRef.current;
    const { selectionStart, selectionEnd, value } = textarea;
    const updatedValue =
      value.substring(0, selectionStart) +
      emoji +
      value.substring(selectionEnd);
    textarea.value = updatedValue;

    // Set the cursor position after the inserted emoji
    const cursorPosition = selectionStart + emoji.length;
    textarea.setSelectionRange(cursorPosition, cursorPosition);

    // Trigger the input event to update any event listeners or bindings
    const event = new Event("input", { bubbles: true });
    textarea.dispatchEvent(event);

    // Set focus to the textarea
    textarea.focus();
  };

  return (
    <div>
      <textarea ref={textareaRef}></textarea>
      <div>
        {emojiOptions.map((emoji, index) => (
          <span
            key={index}
            className="emoji-option"
            onClick={() => insertEmoji(emoji)}
          >
            {emoji}
          </span>
        ))}
      </div>
    </div>
  );
};

export const OverLay = ({ bio, setTempTheme }) => {
  // const editor = useSlate();
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
    let text = "";
    messages.forEach((item) => {
      if (item.type === "paragraph") {
        const paragraphText = item.children[0].text;
        text += paragraphText + "\n";
      }
    });
    setTempTheme((prevState) => ({
      ...prevState,
      userBio: text,
    }));
  };

  const onEmojiSelect = (emoji) => {
    console.log("Emoji selected: ", emoji);
    const text = { text: emoji };
    // Transforms.insertNodes(editor, text);
    setSelectedEmoji(emoji);
    setTempTheme((prevState) => ({
      ...prevState,
    }));
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
        {/* <EventContext.Provider
          value={{
            showEmojiOverLay,
            selectedEmoji,
            setSelectedEmoji,
            bio,
          }}
        >
          <SlateInput onMessageSubmit={onMessageSubmit} />
        </EventContext.Provider> */}
        <EmojiSelector />
      </div>
    </div>
  );
};

const UserBio = ({ tempTheme, setTempTheme, theme }) => {
  console.log(
    "theme bio => " +
      theme?.userBio +
      " : " +
      "tempTheme bio => " +
      tempTheme?.userBio
  );
  // let tempBio = theme?.userBio ?? theme?.userBio == tempTheme?.userBio;
  // tempBio ??= tempTheme?.userBio;
  let tempBio = "";
  if (theme?.userBio === tempTheme?.userBio) {
    tempBio = theme?.userBio;
  } else {
    tempBio = tempTheme?.userBio;
  }
  console.log(tempBio);

  const [showPicker, setShowPicker] = useState(false);
  const colorPickerRef = useRef(null);
  // const editor = useMemo(() => withReact(createEditor()), []);

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
              {/* <Slate
                editor={editor}
                value={editorValue}
                onChange={setEditorValue}
              >
                <OverLay
                  showPicker={showPicker}
                  bio={tempBio}
                  tempTheme={tempTheme}
                  setTempTheme={setTempTheme}
                />
              </Slate> */}

              <OverLay
                showPicker={showPicker}
                bio={tempBio}
                tempTheme={tempTheme}
                setTempTheme={setTempTheme}
              />
            </div>
          )}
        </div>
      </div>
      {/* <div style={{ opacity: "0.4", padding: "25px", paddingTop: "10px" }}>
        This is the start of a new journey filled with twists and turns 😊
      </div> */}
    </div>
  );
};

export default UserBio;
