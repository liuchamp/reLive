
export interface CoderBody {
    context: string;
}

export const postData = async (data: CoderBody): Promise<string> => {
    try {
        const response = await fetch('/parser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        if (!result.code) {
            return result.data;
        }
        console.log(result);

        throw new Error('数据提交失败，请稍后重试！');
    } catch (error) {
        console.error('Error posting data:', error);
        throw new Error('数据提交失败，请稍后重试！');
    }
};
