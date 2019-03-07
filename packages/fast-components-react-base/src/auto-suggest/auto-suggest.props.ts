import * as React from "react";
import {
    AutoSuggestClassNameContract,
    ManagedClasses,
} from "@microsoft/fast-components-class-name-contracts-base";
import { ListboxItemProps } from "../listbox-item";
import { AutoSuggestState } from "./auto-suggest";

export interface AutoSuggestManagedClasses
    extends ManagedClasses<AutoSuggestClassNameContract> {}
export interface AutoSuggestUnhandledProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface AutoSuggestHandledProps extends AutoSuggestManagedClasses {
    /**
     * Custom function to render the input box of the control
     */
    inputRegion?: (props: AutoSuggestProps, state: AutoSuggestState) => React.ReactNode;

    /**
     * Specifies that the drop-down list is open
     */
    isMenuOpen?: boolean;

    /**
     * Specifies that the control is disabled
     */
    disabled?: boolean;

    /**
     * String displayed when there text entered
     */
    placeholder?: string;

    /**
     * Pre-populates input field with provided string on mount
     */
    initialValue?: string;

    /**
     * The value of the input field (controlled mode)
     */
    value?: string;

    /**
     * The option invoked event handler
     */
    onOptionInvoked?: (selectedItem: ListboxItemProps) => void;

    /**
     * The onValueChanged event handler
     * called when text changes in the input region
     */
    onValueChanged?: (value: string) => void;

    /**
     * The onInvoked event handler
     * called when the input text is invoked
     * (ie. user hits enter while focused on the input area)
     */
    onInvoked?: (value: string) => void;

    /**
     * The aria-labelledby attribute to link the auto-suggest to an existing
     * element that provides it an accessible name
     */
    labelledBy?: string;
}

export type AutoSuggestProps = AutoSuggestHandledProps & AutoSuggestUnhandledProps;
