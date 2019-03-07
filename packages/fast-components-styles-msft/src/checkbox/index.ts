import { DesignSystem, withDesignSystemDefaults } from "../design-system";
import {
    ComponentStyles,
    ComponentStyleSheet,
    CSSRules,
} from "@microsoft/fast-jss-manager";
import { CheckboxClassNameContract } from "@microsoft/fast-components-class-name-contracts-base";
import { applyTypeRampConfig } from "../utilities/typography";
import {
    applyFocusVisible,
    applyLocalizedProperty,
    Direction,
    toPx,
} from "@microsoft/fast-jss-utilities";
import {
    neutralFillInputActive,
    neutralFillInputHover,
    neutralFillInputRest,
    neutralFocus,
    neutralForegroundRest,
    neutralOutlineActive,
    neutralOutlineHover,
    neutralOutlineRest,
} from "../utilities/color";

const styles: ComponentStyles<CheckboxClassNameContract, DesignSystem> = (
    config: DesignSystem
): ComponentStyleSheet<CheckboxClassNameContract, DesignSystem> => {
    const designSystem: DesignSystem = withDesignSystemDefaults(config);
    const direction: Direction = designSystem.direction;

    return {
        checkbox: {
            position: "relative",
            display: "inline-flex",
            flexDirection: "row",
            alignItems: "center",
            transition: "all 0.2s ease-in-out",
            "& $checkbox_label": {
                [applyLocalizedProperty("paddingLeft", "paddingRight", direction)]: "8px",
            },
        },
        checkbox_input: {
            position: "absolute",
            width: "20px",
            height: "20px",
            appearance: "none",
            borderRadius: "2px",
            boxSizing: "border-box",
            margin: "0",
            zIndex: "1",
            background: neutralFillInputRest,
            transition: "all 0.2s ease-in-out",
            border: `${toPx(
                designSystem.outlinePatternOutlineWidth
            )} solid ${neutralOutlineRest(designSystem)}`,
            "&:hover": {
                background: neutralFillInputHover,
                border: `${toPx(
                    designSystem.outlinePatternOutlineWidth
                )} solid ${neutralOutlineHover(designSystem)}`,
            },
            "&:active": {
                background: neutralFillInputActive,
                border: `${toPx(
                    designSystem.outlinePatternOutlineWidth
                )} solid ${neutralOutlineActive(designSystem)}`,
            },
            ...applyFocusVisible({
                boxShadow: `0 0 0 1px ${neutralFocus(designSystem)} inset`,
                border: `${toPx(
                    designSystem.outlinePatternOutlineWidth
                )} solid ${neutralFocus(designSystem)}`,
            }),
        },
        checkbox_stateIndicator: {
            position: "relative",
            borderRadius: "2px",
            display: "inline-block",
            width: "20px",
            height: "20px",
            flexShrink: "0",
            "&::before, &::after": {
                content: "''",
                pointerEvents: "none",
                width: "2px",
                position: "absolute",
                zIndex: "1",
            },
            "&::before": {
                top: "4px",
                left: "11px",
                height: "12px",
                transform: "rotate(40deg)",
            },
            "&::after": {
                top: "9px",
                left: "6px",
                height: "6px",
                transform: "rotate(-45deg)",
            },
        },
        checkbox_label: {
            color: neutralForegroundRest,
            ...applyTypeRampConfig("t7"),
        },
        checkbox__checked: {
            "& $checkbox_stateIndicator": {
                "&::after, &::before": {
                    position: "absolute",
                    zIndex: "1",
                    content: '""',
                    borderRadius: toPx(designSystem.cornerRadius),
                    background: neutralForegroundRest,
                    "@media (-ms-high-contrast:active)": {
                        backgroundColor: "ButtonHighlight",
                    },
                },
            },
        },
        checkbox__indeterminate: {
            "& $checkbox_stateIndicator": {
                "&::before": {
                    borderRadius: toPx(designSystem.cornerRadius),
                    transform: "none",
                    [applyLocalizedProperty("left", "right", direction)]: "5px",
                    top: "5px",
                    height: "10px",
                    width: "10px",
                    background: neutralForegroundRest,
                    "@media (-ms-high-contrast:active)": {
                        backgroundColor: "ButtonHighlight",
                    },
                },
                "&::after": {
                    content: "none",
                },
            },
        },
        checkbox__disabled: {
            opacity: "0.3",
            cursor: "not-allowed",
        },
    };
};

export default styles;
