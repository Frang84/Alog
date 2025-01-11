

export const sendRequest = async (url: string, payload : object) => {
    
    try {
        const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        });

        const data = await response.json();
        if(!response.ok){
            throw new Error(data.details || "error occured");
        }
        return data;
    }catch(error){
        console.error("error during POST request", error);
        throw error;
    }
}

export const apiPostRequest = async (url: string, payload: object, accessToken: string) => {
    try {
        const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + accessToken,
        },
        body: JSON.stringify(payload),
        });

        const data = await response.json();
        if(!response.ok){
            throw new Error(data.details || "error occured");
        }
        return data;
    }catch(error){
        console.error("error during POST request", error);
        throw error;
    }
}

export const apiGetRequest = async (url: string, accessToken: string) => {
    try {
        const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + accessToken,
        },
        
        });

        const data = await response.json();
        if(!response.ok){
            throw new Error(data.details || "error occured");
        }
        return data;
    }catch(error){
        console.error("error during GET request", error);
        throw error;
    }
}