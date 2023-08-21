const content = (usersList, userId) => {
    const n = usersList.length;
    const userHasLiked = Boolean(usersList?.find(u => u?.user_id === userId));

    if(userHasLiked) {
        if(n === 1) {
            return "Você";
        } else if (n === 2) {
            return "Você and " + (usersList.find(u => u.user_id !== userId)?.username || "Fulano");
        } else {
            return "Você, "
                + (usersList.find(u => u.user_id !== userId)?.username || "Fulano")
                + " and other " + (n - 2).toString() +  " people";
        }
    } else {
        if (n === 1) {
            return (usersList[0]?.username || "Fulano");
        } else if (n === 2) {
            return usersList.map(u => u.username || "Fulano").join(" and ");
        } else {
            return (usersList[0]?.username || "Fulano")
            + ", " + (usersList[0]?.username || "Fulano")
            + " and other " + (n - 2).toString() + " people";
        }
    }
};

export default content;