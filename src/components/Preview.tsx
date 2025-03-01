import { useNavigate } from "react-router-dom";
import useStore from "../store";
import Component from "./Component";

export default function Preview() {
    const navigate = useNavigate();
    const { headerStack, leftStack, rightStack, footerStack } = useStore(
        (state) => state.project
    );

    const isEmpty =
        headerStack.length === 0 &&
        leftStack.length === 0 &&
        rightStack.length === 0 &&
        footerStack.length === 0;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="w-[100%] h-[100%] flex flex-col bg-gradient-to-b from-gray-50 to-gray-200 shadow-lg rounded-lg overflow-auto p-6">
                {isEmpty ? (
                    <div className="text-black text-center p-6">
                        No elements on the palette. Drag and drop components to get started!
                    </div>
                ) : (
                    <>
                        {headerStack.length > 0 && (
                            <div className="p-4 flex flex-row flex-wrap gap-2">
                                {headerStack.map((comp, index) => (
                                    <Component key={index} {...comp} />
                                ))}
                            </div>
                        )}
                        
                        <div className="flex flex-wrap justify-center gap-4">
                            
                            {leftStack.length > 0 && (
                                <div className="p-4 flex flex-col gap-2">
                                    {leftStack.map((comp, index) => (
                                        <Component key={index} {...comp} />
                                    ))}
                                </div>
                            )}

                            {rightStack.length > 0 && (
                                <div className="p-4 flex flex-col gap-2">
                                    {rightStack.map((comp, index) => (
                                        <Component key={index} {...comp} />
                                    ))}
                                </div>
                            )}
                        </div>

                        {footerStack.length > 0 && (
                            <div className="p-4 flex flex-row flex-wrap gap-2">
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
