import { CoderResponse, CoderBody } from "../ov/pos";




export const postData = async (data: CoderBody): Promise<CoderResponse> => {
    try {
        const response = await fetch('/api/parser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error posting data:', error);
        throw new Error('数据提交失败，请稍后重试！');
    }
};
