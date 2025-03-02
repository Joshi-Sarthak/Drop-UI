import useStore from "../store";
import Component from "./Component";

export default function Preview() {
    const { headerStack, leftStack, rightStack, footerStack } = useStore(
        (state) => state.project
    );

    const isEmpty =
        headerStack.length === 0 &&
        leftStack.length === 0 &&
        rightStack.length === 0 &&
        footerStack.length === 0;

    return (
        <div className="mt-4 mb-4 ml-4 h-screen flex flex-col bg-gray-100">
            <div className="w-[99%] h-full flex flex-col bg-gradient-to-b from-gray-200 to-gray-300 shadow-lg rounded-lg overflow-auto">
                {isEmpty ? (
                    <div className="text-black text-center p-4">
                        No elements on the palette. Drag and drop components to get started!
                    </div>
                ) : (
                    <>
                        {/* Header Stack */}
                        {headerStack.length > 0 && (
                            <div className="w-full">
                                {headerStack.map((comp, index) => (
                                    <Component key={index} {...comp} />
                                ))}
                            </div>
                        )}

                        {/* Main Content with Left & Right Stacks */}
                        <div className="flex flex-grow w-full p-4">
                            {/* Left Stack */}
                            <div className="w-1/2 p-4 min-h-[300px]">
                                {leftStack.length > 0 && (
                                    leftStack.map((comp, index) => (
                                        <Component key={index} {...comp} />
                                    ))
                                )}
                            </div>

                            {/* Right Stack */}
                            <div className="w-1/2 p-4 min-h-[300px]">
                                {rightStack.length > 0 && (
                                    rightStack.map((comp, index) => (
                                        <Component key={index} {...comp} />
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Footer Stack */}
                        {footerStack.length > 0 && (
                            <div className="w-full p-4">
                                {footerStack.map((comp, index) => (
                                    <Component key={index} {...comp} />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
