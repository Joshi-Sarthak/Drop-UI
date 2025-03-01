import { useNavigate } from "react-router-dom";
import useStore from "../store";
import Component from "./Component";

export default function Preview() {
    const navigate = useNavigate();
    const { headerStack, leftStack, rightStack, footerStack } = useStore(
        (state) => state.project
    );

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            {/* Dynamic Container with Gradient Background */}
            <div className="w-fit max-w-full flex flex-col bg-gradient-to-b from-gray-50 to-gray-200 shadow-lg rounded-lg overflow-hidden p-6">
                {/* Header Section */}
                {headerStack.length > 0 && (
                    <div className="p-4 flex flex-row flex-wrap gap-2">
                        {headerStack.map((comp, index) => (
                            <Component key={index} {...comp} />
                        ))}
                    </div>
                )}

                {/* Main Content */}
                <div className="flex flex-wrap justify-center gap-4">
                    {/* Left Content */}
                    {leftStack.length > 0 && (
                        <div className="p-4">
                            {leftStack.map((comp, index) => (
                                <Component key={index} {...comp} />
                            ))}
                        </div>
                    )}

                    {/* Right Content */}
                    {rightStack.length > 0 && (
                        <div className="p-4">
                            {rightStack.map((comp, index) => (
                                <Component key={index} {...comp} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer Section */}
                {footerStack.length > 0 && (
                    <div className="p-4 flex flex-row flex-wrap gap-2">
                        {footerStack.map((comp, index) => (
                            <Component key={index} {...comp} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
