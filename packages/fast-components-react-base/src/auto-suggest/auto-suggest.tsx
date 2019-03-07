import * as React from "react";
import Foundation, { HandledProps } from "@microsoft/fast-components-foundation-react";
import { get } from "lodash-es";
import { KeyCodes } from "@microsoft/fast-web-utilities";
import { AutoSuggestClassNameContract } from "@microsoft/fast-components-class-name-contracts-base";
import {
    AutoSuggestHandledProps,
    AutoSuggestProps,
    AutoSuggestUnhandledProps,
} from "./auto-suggest.props";
import { ListboxItemProps } from "../listbox-item";
import Listbox from "../listbox";
import TextField, { TextFieldType } from "../text-field";

export interface AutoSuggestState {
    currentValue: string;
    isMenuOpen: boolean;
    focusedItem: ListboxItemProps;
}

class AutoSuggest extends Foundation<
    AutoSuggestHandledProps,
    AutoSuggestUnhandledProps,
    AutoSuggestState
> {
    public static displayName: string = "AutoSuggest";

    public static defaultProps: Partial<AutoSuggestProps> = {
        initialValue: "",
        disabled: false,
        placeholder: "",
    };

    /**
     * Handled props instantiation
     */
    protected handledProps: HandledProps<AutoSuggestHandledProps> = {
        isMenuOpen: void 0,
        disabled: void 0,
        labelledBy: void 0,
        inputRegion: void 0,
        managedClasses: void 0,
        initialValue: void 0,
        onOptionInvoked: void 0,
        onValueChanged: void 0,
        onInvoked: void 0,
        placeholder: void 0,
    };

    private rootElement: React.RefObject<HTMLDivElement> = React.createRef<
        HTMLDivElement
    >();

    private shouldFocusMenuOnNextRender: boolean = false;

    /**
     * constructor
     */
    constructor(props: AutoSuggestProps) {
        super(props);

        this.state = {
            currentValue: this.props.initialValue,
            focusedItem: null,
            isMenuOpen: this.validateMenuState(false),
        };
    }

    public componentDidUpdate(prevProps: AutoSuggestProps): void {
        const updatedMenuVisibility: boolean = this.validateMenuState(
            this.state.isMenuOpen
        );

        if (updatedMenuVisibility !== this.state.isMenuOpen) {
            this.toggleMenu(updatedMenuVisibility);
        }
    }

    public componentDidMount(): void {
        window.addEventListener("click", this.handleWindowClick);
    }

    public componentWillUnmount(): void {
        window.removeEventListener("click", this.handleWindowClick);
    }

    /**
     * Renders the component
     */
    public render(): React.ReactElement<HTMLDivElement> {
        return (
            <div
                {...this.unhandledProps()}
                aria-disabled={this.props.disabled || null}
                ref={this.rootElement}
                className={this.generateClassNames()}
                onClick={this.handleClick}
                onChange={this.handleChange}
            >
                <div onKeyDown={this.handleInputRegionKeydown}>
                    {this.renderInputRegion()}
                </div>
                {this.renderMenu()}
            </div>
        );
    }

    /**
     * Create class names
     */
    protected generateClassNames(): string {
        let className: string = get(this.props.managedClasses, "autoSuggest", "");

        if (this.props.disabled) {
            className = className.concat(
                " ",
                get(this.props.managedClasses, "autoSuggest__disabled", "")
            );
        }

        if (this.state.isMenuOpen) {
            className = className.concat(
                " ",
                get(this.props.managedClasses, "autoSuggest_menu__open", "")
            );
        }

        return super.generateClassNames(className);
    }

    /**
     * Determine which function to use to render content display (ie. the part of the control that shows when the menu isn't open)
     * and invokes it
     */
    private renderInputRegion(): React.ReactNode {
        if (this.props.inputRegion !== undefined) {
            return this.props.inputRegion(this.props, this.state);
        } else {
            return this.defaultInputRegionRenderFunction(this.props, this.state);
        }
    }

    /**
     * Determine which function to use to render the menu and invokes it
     */
    private renderMenu(): React.ReactNode {
        const shouldFocusOnMenu: boolean = this.shouldFocusMenuOnNextRender;
        this.shouldFocusMenuOnNextRender = false;

        if (!this.state.isMenuOpen) {
            return;
        }

        const focusedItem: ListboxItemProps[] =
            this.state.focusedItem !== null ? [this.state.focusedItem] : [];
        return (
            <Listbox
                typeAheadEnabled={false}
                labelledBy={this.props.labelledBy}
                disabled={this.props.disabled}
                focusItemOnMount={shouldFocusOnMenu}
                defaultSelection={focusedItem}
                onSelectedItemsChanged={this.updateFocusedItem}
                onKeyDown={this.handleMenuKeydown}
                managedClasses={{
                    listbox: get(this.props.managedClasses, "autoSuggest_menu", ""),
                    listbox__disabled: get(
                        this.props.managedClasses,
                        "autoSuggest_menuDisabled",
                        ""
                    ),
                }}
            >
                {this.props.children}
            </Listbox>
        );
    }

    /**
     * The default function that renders an unstyled content display
     */
    private defaultInputRegionRenderFunction = (
        props: AutoSuggestProps,
        state: AutoSuggestState
    ): React.ReactNode => {
        return (
            <TextField
                value={this.state.currentValue}
                type={TextFieldType.text}
                disabled={props.disabled}
                aria-labelledby={props.labelledBy || null}
            />
        );
    };

    /**
     * Updates selection state and associated values
     */
    private updateFocusedItem = (newSelection: ListboxItemProps[]): void => {
        if (newSelection.length === 0) {
            this.setState({
                focusedItem: null,
            });
        } else {
            this.setState({
                focusedItem: newSelection[0],
                currentValue: newSelection[0].value,
            });
        }

        if (typeof this.props.onOptionInvoked === "function") {
            // this.props.onValueChange();
        }
    };

    /**
     * Handles clicks
     */
    private handleClick = (e: React.MouseEvent): void => {
        if (this.props.disabled || e.defaultPrevented) {
            return;
        }
        this.toggleMenu(!this.state.isMenuOpen);
    };

    /**
     * Handles value changes from input element
     */
    private handleChange = (e: React.FormEvent): void => {
        const newValue: string = (e.target as HTMLInputElement).value;
        this.updateValue(newValue);
    };

    /**
     * Update the currentValue of the component
     */
    private updateValue = (newValue: string): void => {
        if (newValue !== this.state.currentValue) {
            this.toggleMenu(true);
            this.setState({
                currentValue: newValue,
            });
        }
    };

    /**
     * Handles input region key events
     */
    private handleInputRegionKeydown = (e: React.KeyboardEvent<Element>): void => {
        if (this.props.disabled || e.defaultPrevented) {
            return;
        }

        switch (e.keyCode) {
            case KeyCodes.escape:
                this.toggleMenu(false);
                break;

            case KeyCodes.arrowDown:
                this.focusOnMenu(1);
                break;

            case KeyCodes.arrowUp:
                this.focusOnMenu(-1);
                break;

            default:
                if (e.target instanceof HTMLInputElement) {
                    const newValue: string = (e.target as HTMLInputElement).value;
                    this.updateValue(newValue);
                    break;
                }
        }
    };

    /**
     * Handles menu key events
     */
    private handleMenuKeydown = (e: React.KeyboardEvent<Element>): void => {
        if (this.props.disabled || e.defaultPrevented) {
            return;
        }
        switch (e.keyCode) {
            case KeyCodes.escape:
                this.toggleMenu(false);
                break;

            case KeyCodes.arrowDown:
                this.checkForMenuEnd(1);
                break;

            case KeyCodes.arrowUp:
                this.checkForMenuEnd(-1);
                break;

            default:
                if (this.isValidInput(e)) {
                    this.focusOnInput();
                }
                break;
        }
    };

    /**
     * test if a key press is a valid input
     */
    private isValidInput = (e: React.KeyboardEvent<Element>): boolean => {
        if (
            e.keyCode < 8 ||
            (e.keyCode > 8 && e.keyCode < 48) ||
            (e.keyCode > 90 && e.keyCode < 96) ||
            (e.keyCode > 111 && e.keyCode < 186) ||
            e.keyCode > 222
        ) {
            return false;
        }
        return true;
    };

    /**
     * Passes focus to the input element if focus would bump up against the ends of the menu
     */
    private checkForMenuEnd = (increment: number): void => {
        if (this.state.focusedItem === null) {
            return;
        }

        const childrenAsArray: React.ReactNode[] = React.Children.toArray(
            this.props.children
        );

        const currentItemIndex: number = Listbox.getItemIndexById(
            this.state.focusedItem.id,
            this.props.children
        );

        const startIndex: number = currentItemIndex;
        const endIndex: number = increment > -1 ? childrenAsArray.length - 1 : 0;

        const nextFocusableItem: ListboxItemProps = (Listbox.getFirstValidOptionInRange(
            startIndex,
            endIndex,
            childrenAsArray,
            increment
        ) as React.ReactElement<any>).props;

        if (
            nextFocusableItem === null ||
            nextFocusableItem.id === this.state.focusedItem.id
        ) {
            // at the end of the list, focus on input
            this.focusOnInput();
        }
    };

    /**
     * Opens menu and focuses on first or last valid item
     */
    private focusOnMenu = (increment: number): void => {
        const childrenAsArray: React.ReactNode[] = React.Children.toArray(
            this.props.children
        );

        if (childrenAsArray.length === 0) {
            return;
        }

        const startIndex: number = increment > -1 ? 0 : childrenAsArray.length - 1;
        const endIndex: number = increment > -1 ? childrenAsArray.length - 1 : 0;
        this.focusFirstItemInRange(startIndex, endIndex, childrenAsArray, increment);

        this.toggleMenu(true);
        this.shouldFocusMenuOnNextRender = true;
    };

    /**
     * Gets first child in a range
     */
    private focusFirstItemInRange = (
        startIndex: number,
        endIndex: number,
        childrenAsArray: React.ReactNode[],
        increment: number
    ): void => {
        const validOption: React.ReactNode = Listbox.getFirstValidOptionInRange(
            startIndex,
            endIndex,
            childrenAsArray,
            increment
        );
        if (validOption !== null) {
            this.updateFocusedItem([(validOption as React.ReactElement<any>).props]);
        }
    };

    /**
     * Toggles the menu
     */
    private toggleMenu = (desiredMenuState: boolean): void => {
        const updatedIsMenuOpen: boolean = this.validateMenuState(desiredMenuState);
        if (updatedIsMenuOpen !== this.state.isMenuOpen) {
            this.setState({
                isMenuOpen: updatedIsMenuOpen,
            });
            if (this.state.isMenuOpen && !updatedIsMenuOpen) {
                this.focusOnInput();
            }
        }
    };

    /**
     * Focus on the input element
     */
    private focusOnInput = (): void => {
        const inputElements: HTMLCollectionOf<
            HTMLInputElement
        > = this.rootElement.current.getElementsByTagName("input");
        if (inputElements.length > 0) {
            inputElements[0].focus();
        }
    };

    /**
     * Determine menu state by comparing desired state to props
     */
    private validateMenuState = (desiredMenuState: boolean): boolean => {
        let shouldOpenMenu: boolean = desiredMenuState;

        if (React.Children.count(this.props.children) === 0) {
            shouldOpenMenu = false;
        }

        if (this.props.isMenuOpen !== undefined) {
            shouldOpenMenu = this.props.isMenuOpen;
        }
        return shouldOpenMenu;
    };

    /**
     * Close the menu when when there are clicks outside
     */
    private handleWindowClick = (event: MouseEvent): void => {
        if (
            this.state.isMenuOpen &&
            this.rootElement.current !== null &&
            !this.rootElement.current.contains(event.target as Element)
        ) {
            this.toggleMenu(false);
        }
    };
}

export default AutoSuggest;
export * from "./auto-suggest.props";
export { AutoSuggestClassNameContract };
