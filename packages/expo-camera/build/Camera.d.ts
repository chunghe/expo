import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
declare type PictureOptions = {
    quality?: number;
    base64?: boolean;
    exif?: boolean;
    skipProcessing?: boolean;
    onPictureSaved?: Function;
    id?: number;
    fastMode?: boolean;
};
declare type RecordingOptions = {
    maxDuration?: number;
    maxFileSize?: number;
    quality?: number | string;
};
declare type CapturedPicture = {
    width: number;
    height: number;
    uri: string;
    base64?: string;
    exif?: any;
};
declare type PropsType = React.ComponentProps<typeof View> & {
    zoom?: number;
    ratio?: string;
    focusDepth?: number;
    type?: number | string;
    onCameraReady?: Function;
    useCamera2Api?: boolean;
    flashMode?: number | string;
    whiteBalance?: number | string;
    autoFocus?: string | boolean | number;
    pictureSize?: string;
    videoStabilizationMode?: number;
    onMountError?: (event: {
        message: string;
    }) => void;
    barCodeScannerSettings?: {};
    onBarCodeScanned?: (scanningResult: {
        type: string;
        data: string;
    }) => void;
    faceDetectorSettings?: {};
    onFacesDetected?: (faces: {
        faces: any[];
    }) => void;
};
export default class Camera extends React.Component<PropsType> {
    static Constants: {
        Type: any;
        FlashMode: any;
        AutoFocus: any;
        WhiteBalance: any;
        VideoQuality: any;
        VideoStabilization: any;
    };
    static ConversionTables: {
        type: any;
        flashMode: any;
        autoFocus: any;
        whiteBalance: any;
    };
    static propTypes: {
        zoom: PropTypes.Requireable<number>;
        ratio: PropTypes.Requireable<string>;
        focusDepth: PropTypes.Requireable<number>;
        onMountError: PropTypes.Requireable<(...args: any[]) => any>;
        pictureSize: PropTypes.Requireable<string>;
        onCameraReady: PropTypes.Requireable<(...args: any[]) => any>;
        useCamera2Api: PropTypes.Requireable<boolean>;
        onBarCodeScanned: PropTypes.Requireable<(...args: any[]) => any>;
        barCodeScannerSettings: PropTypes.Requireable<object>;
        onFacesDetected: PropTypes.Requireable<(...args: any[]) => any>;
        faceDetectorSettings: PropTypes.Requireable<object>;
        type: PropTypes.Requireable<string | number>;
        flashMode: PropTypes.Requireable<string | number>;
        videoStabilizationMode: PropTypes.Requireable<number>;
        whiteBalance: PropTypes.Requireable<string | number>;
        autoFocus: PropTypes.Requireable<string | number | boolean>;
        hitSlop: PropTypes.Validator<import("react-native").Insets | undefined>;
        onLayout: PropTypes.Validator<((event: import("react-native").LayoutChangeEvent) => void) | undefined>;
        pointerEvents: PropTypes.Validator<"box-none" | "none" | "box-only" | "auto" | undefined>;
        removeClippedSubviews: PropTypes.Validator<boolean | undefined>;
        style: PropTypes.Validator<import("react-native").StyleProp<import("react-native").ViewStyle>>;
        testID: PropTypes.Validator<string | undefined>;
        collapsable: PropTypes.Validator<boolean | undefined>;
        needsOffscreenAlphaCompositing: PropTypes.Validator<boolean | undefined>;
        renderToHardwareTextureAndroid: PropTypes.Validator<boolean | undefined>;
        accessibilityViewIsModal: PropTypes.Validator<boolean | undefined>;
        accessibilityActions: PropTypes.Validator<string[] | undefined>;
        onAccessibilityAction: PropTypes.Validator<(() => void) | undefined>;
        shouldRasterizeIOS: PropTypes.Validator<boolean | undefined>;
        onStartShouldSetResponder: PropTypes.Validator<((event: import("react-native").GestureResponderEvent) => boolean) | undefined>;
        onMoveShouldSetResponder: PropTypes.Validator<((event: import("react-native").GestureResponderEvent) => boolean) | undefined>;
        onResponderEnd: PropTypes.Validator<((event: import("react-native").GestureResponderEvent) => void) | undefined>;
        onResponderGrant: PropTypes.Validator<((event: import("react-native").GestureResponderEvent) => void) | undefined>;
        onResponderReject: PropTypes.Validator<((event: import("react-native").GestureResponderEvent) => void) | undefined>;
        onResponderMove: PropTypes.Validator<((event: import("react-native").GestureResponderEvent) => void) | undefined>;
        onResponderRelease: PropTypes.Validator<((event: import("react-native").GestureResponderEvent) => void) | undefined>;
        onResponderStart: PropTypes.Validator<((event: import("react-native").GestureResponderEvent) => void) | undefined>;
        onResponderTerminationRequest: PropTypes.Validator<((event: import("react-native").GestureResponderEvent) => boolean) | undefined>;
        onResponderTerminate: PropTypes.Validator<((event: import("react-native").GestureResponderEvent) => void) | undefined>;
        onStartShouldSetResponderCapture: PropTypes.Validator<((event: import("react-native").GestureResponderEvent) => boolean) | undefined>;
        onMoveShouldSetResponderCapture: PropTypes.Validator<((event: import("react-native").GestureResponderEvent) => boolean) | undefined>;
        onTouchStart: PropTypes.Validator<((event: import("react-native").GestureResponderEvent) => void) | undefined>;
        onTouchMove: PropTypes.Validator<((event: import("react-native").GestureResponderEvent) => void) | undefined>;
        onTouchEnd: PropTypes.Validator<((event: import("react-native").GestureResponderEvent) => void) | undefined>;
        onTouchCancel: PropTypes.Validator<((event: import("react-native").GestureResponderEvent) => void) | undefined>;
        onTouchEndCapture: PropTypes.Validator<((event: import("react-native").GestureResponderEvent) => void) | undefined>;
        accessible: PropTypes.Validator<boolean | undefined>;
        accessibilityLabel: PropTypes.Validator<string | undefined>;
        accessibilityRole: PropTypes.Validator<"button" | "header" | "link" | "summary" | "image" | "text" | "none" | "search" | "keyboardkey" | "adjustable" | "imagebutton" | undefined>;
        accessibilityStates: PropTypes.Validator<import("react-native").AccessibilityState[] | undefined>;
        accessibilityHint: PropTypes.Validator<string | undefined>;
        accessibilityComponentType: PropTypes.Validator<"button" | "none" | "radiobutton_checked" | "radiobutton_unchecked" | undefined>;
        accessibilityLiveRegion: PropTypes.Validator<"none" | "polite" | "assertive" | undefined>;
        importantForAccessibility: PropTypes.Validator<"auto" | "yes" | "no" | "no-hide-descendants" | undefined>;
        accessibilityElementsHidden: PropTypes.Validator<boolean | undefined>;
        accessibilityTraits: PropTypes.Validator<"button" | "header" | "link" | "summary" | "image" | "text" | "none" | "search" | "adjustable" | "selected" | "disabled" | "plays" | "key" | "frequentUpdates" | "startsMedia" | "allowsDirectInteraction" | "pageTurn" | import("react-native").AccessibilityTrait[] | undefined>;
        onAccessibilityTap: PropTypes.Validator<(() => void) | undefined>;
        onMagicTap: PropTypes.Validator<(() => void) | undefined>;
        accessibilityIgnoresInvertColors: PropTypes.Validator<boolean | undefined>;
    };
    static defaultProps: PropsType;
    _cameraHandle?: number | null;
    _cameraRef?: React.Component | null;
    _lastEvents: {
        [eventName: string]: string;
    };
    _lastEventsTimes: {
        [eventName: string]: Date;
    };
    constructor(props: PropsType);
    takePictureAsync(options?: PictureOptions): Promise<CapturedPicture>;
    getSupportedRatiosAsync(): Promise<Array<string>>;
    getAvailablePictureSizesAsync(ratio?: string): Promise<Array<string>>;
    recordAsync(options?: RecordingOptions): Promise<{
        uri: string;
    }>;
    stopRecording(): void;
    pausePreview(): void;
    resumePreview(): void;
    _onCameraReady: () => void;
    _onMountError: ({ nativeEvent }: {
        nativeEvent: {
            message: string;
        };
    }) => void;
    _onPictureSaved: ({ nativeEvent }: {
        nativeEvent: {
            data: CapturedPicture;
            id: number;
        };
    }) => void;
    _onObjectDetected: (callback?: Function | undefined) => ({ nativeEvent }: {
        nativeEvent: any;
    }) => void;
    _setReference: (ref?: React.Component<{}, {}, any> | undefined) => void;
    render(): JSX.Element;
    _convertNativeProps(props: PropsType): any;
}
export declare const Constants: {
    Type: any;
    FlashMode: any;
    AutoFocus: any;
    WhiteBalance: any;
    VideoQuality: any;
    VideoStabilization: any;
};
export {};
