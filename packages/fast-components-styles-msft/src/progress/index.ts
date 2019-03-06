import designSystemDefaults, {
    DesignSystem,
    withDesignSystemDefaults,
} from "../design-system";
import { ComponentStyles, ComponentStyleSheet } from "@microsoft/fast-jss-manager";
import { ProgressClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";
import { accentFillRest, neutralFillRest } from "../utilities/color";
import { toPx } from "@microsoft/fast-jss-utilities";

const styles: ComponentStyles<ProgressClassNameContract, DesignSystem> = (
    config: DesignSystem
): ComponentStyleSheet<ProgressClassNameContract, DesignSystem> => {
    const designSystem: DesignSystem = withDesignSystemDefaults(config);

    return {
        progress: {
            display: "flex",
            width: "100%",
            alignItems: "center",
            height: toPx(designSystem.designUnit),
            textAlign: "left",
        },
        progress_valueIndicator: {
            background: accentFillRest,
            borderRadius: "100px",
            height: "100%",
            "@media (-ms-high-contrast:active)": {
                background: "ButtonText",
            },
        },
        progress_indicator: {
            position: "relative",
            display: "flex",
            alignItems: "center",
            width: "100%",
            overflow: "hidden",
            borderRadius: "100px",
            height: toPx(designSystem.designUnit),
            background: neutralFillRest,
            maskImage: "-webkit-radial-gradient(white, black)",
        },
        progress_indicator__determinate: {
            height: toPx(designSystem.designUnit),
            borderRadius: "2px",
            "@media (-ms-high-contrast:active)": {
                background: "ButtonShadow",
            },
        },
        progress_indicator__indeterminate: {
            position: "absolute",
            opacity: "0",
            height: "100%",
            backgroundColor: accentFillRest,
            borderRadius: "100px",
            animationTimingFunction: "cubic-bezier(0.4, 0.0, 0.6, 1.0)",
            "@media (-ms-high-contrast:active)": {
                background: "ButtonShadow",
                opacity: "1 !important",
            },
        },
        progress_indicator1__indeterminate: {
            width: "40%",
            transform: "translateX(-100%)",
            animation: "indeterminate-1 2s infinite",
        },
        progress_indicator2__indeterminate: {
            width: "60%",
            transform: "translateX(-150%)",
            animation: "indeterminate-2 2s infinite",
        },
        "@keyframes indeterminate-1": {
            "0%": {
                opacity: "1",
                transform: "translateX(-100%)",
            },
            "70%": {
                opacity: "1",
                transform: "translateX(300%)",
            },
            "70.01%": {
                opacity: "0",
            },
            "100%": {
                opacity: "0",
                transform: "translateX(300%)",
            },
        },
        "@keyframes indeterminate-2": {
            "0%": {
                opacity: "0",
                transform: "translateX(-150%)",
            },
            "29.99%": {
                opacity: "0",
            },
            "30%": {
                opacity: "1",
                transform: "translateX(-150%)",
            },
            "100%": {
                transform: "translateX(166.66%)",
                opacity: "1",
            },
        },
    };
};

export default styles;
