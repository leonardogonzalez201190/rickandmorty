import { navigate } from "../routes";

export function BackButton() {

    const handleBack = () => {
        if (history.length > 2) {
            history.back();
        } else {
            navigate("/");
        }
    };

    return (
        <button onClick={handleBack}>
            ← Back
        </button>
    );
}
