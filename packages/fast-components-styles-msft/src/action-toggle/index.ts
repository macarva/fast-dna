import {
    ComponentStyles,
    ComponentStyleSheet,
    CSSRules,
} from "@microsoft/fast-jss-manager";
import {
    ActionToggleClassNameContract,
    ButtonClassNameContract,
} from "@microsoft/fast-components-class-name-contracts-msft";
import {
    applyLocalizedProperty,
    Direction,
    localizeSpacing,
} from "@microsoft/fast-jss-utilities";
import { DesignSystem, withDesignSystemDefaults } from "../design-system/index";
import {
    accentFillRest,
    accentForegroundCut,
    neutralFillRest,
    neutralForegroundRest,
} from "../utilities/color";

// Since MSFT button is already styled, we need to override in this way to alter button classes
export const actionToggleButtonOverrides: ComponentStyles<
    Partial<ButtonClassNameContract>,
    DesignSystem
> = {
    button: {
        maxWidth: "100%",
        minWidth: "14px",
    },
    button_contentRegion: {
        alignItems: "center",
        display: "flex",
        transition: "all 600ms cubic-bezier(0.19, 1, 0.22, 1)",
        [applyLocalizedProperty("left", "right", Direction.ltr)]: "0",
    },
};

const styles: ComponentStyles<ActionToggleClassNameContract, DesignSystem> = (
    config: DesignSystem
): ComponentStyleSheet<ActionToggleClassNameContract, DesignSystem> => {
    const designSystem: DesignSystem = withDesignSystemDefaults(config);
    const direction: Direction = designSystem.direction;

    return {
        actionToggle: {},
        actionToggle__selected: {},
        actionToggle_selectedGlyph: {
            display: "inline-block",
            position: "relative",
            maxWidth: "16px",
        },
        actionToggle_unselectedGlyph: {
            display: "inline-block",
            position: "relative",
            maxWidth: "16px",
        },
        actionToggle__primary: {
            "& $actionToggle_selectedGlyph, & $actionToggle_unselectedGlyph": {
                fill: accentForegroundCut,
            },
            "&$actionToggle__disabled $actionToggle_selectedGlyph, &$actionToggle__disabled $actionToggle_unselectedGlyph": {
                fill: accentForegroundCut,
            },
        },
        actionToggle__lightweight: {
            "& $actionToggle_selectedGlyph, & $actionToggle_unselectedGlyph": {
                fill: accentFillRest,
            },
            "&$actionToggle__disabled $actionToggle_selectedGlyph, &$actionToggle__disabled $actionToggle_unselectedGlyph": {
                fill: neutralForegroundRest,
            },
        },
        actionToggle__justified: {
            [applyLocalizedProperty("marginLeft", "marginRight", direction)]: "-10px",
            "& $actionToggle_selectedGlyph, & $actionToggle_unselectedGlyph": {
                fill: accentFillRest,
            },
            "&$actionToggle__disabled $actionToggle_selectedGlyph, &$actionToggle__disabled $actionToggle_unselectedGlyph": {
                fill: neutralForegroundRest,
            },
        },
        actionToggle__outline: {
            "& $actionToggle_selectedGlyph, & $actionToggle_unselectedGlyph": {
                fill: neutralForegroundRest,
            },
            "&$actionToggle__disabled $actionToggle_selectedGlyph, &$actionToggle__disabled $actionToggle_unselectedGlyph": {
                fill: neutralForegroundRest,
            },
        },
        actionToggle__disabled: {},
        actionToggle__hasGlyphAndContent: {
            "& $actionToggle_selectedGlyph, & $actionToggle_unselectedGlyph,": {
                [applyLocalizedProperty("marginRight", "marginLeft", direction)]: "6px",
            },
        },
    };
};

export default styles;
