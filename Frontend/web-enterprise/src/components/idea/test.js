import { useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../constants/constants";

const Test = () => {
    useEffect(() => {
        try {
            (async () => {
                const response = await axios.get(`${apiUrl}/idea/home`);
                if (response.data.success) {
                    const { ideas, categories } = response.data;
                    console.log(ideas[0]);
                    // console.log(categories);
                }
            })();
        } catch (error) {
            console.log(error.response.data);
        }
    }, []);

    return <h1>Test Only</h1>
};

export default Test;