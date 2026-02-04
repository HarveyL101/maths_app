const ChangeEmail = () => {


    const handleSubmit = () => {

        const formData = new FormData(e.target);

        const data = {
            oldEmail: formData.get("oldEmail"),
            newEmail: formData.get("newEmail")
        };

        
    }
    return (
        <div>
            <form action="" method="post">
            <input type="email" name="oldEmail" />
            <input type="email" name="newEmail" />

            <button type="reset">Reset</button>
            <button type="submit" onSubmit={handleSubmit}>Submit</button>
            </form>
                
        </div>
    );
};

export default ChangeEmail;