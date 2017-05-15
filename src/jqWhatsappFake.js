/**
* @class whatsappfake
*/
$.widget("jq.whatsappfake", {
    /**
    * @memberof whatsappfake
    */
    NAMESPACE: "jqWhatsappFake",
    ON_CHATFAKE_START: "whatsappfaketart",
    ON_CHATFAKE_OVER: 'whatsappfakeover',



    // Default options.
    options: {
        data_json: '',
        classes: {
            'hz-whatsapp-fake': 'hz-whatsapp-fake-default'
        }

    },
    /**
    * @memberof whatsappfake
    * Función de creación del widget
    * @function
    */
    _create: function () {
        console.log('create');
        //Var declaration globales
        this._conversations;
        this._users;

        this._getDataJson();
    },

    /**
    * Inicia el componente
    */
    _init: function () {

    },

    _getDataJson: function () {
        let that = this;
        let url = this.options.data_json;

        $.getJSON(url, function (data) {
            that._conversations = data.conversations;
            that._users = data.users;
            that._drawChat();
        });

    },

    _getUserData:function (user_name) {
        let user;
        for(let i=0; i<this._users.length; i++){
            if(user_name== this._users[i].name){
                return this._users[i];
                break;
            }
        }
    },

    _drawChat: function () {
        let that = this;
        let conversation = that._conversations[0];
        let users=that._users;
        let type = that._conversations[0].conversation.type;
        let hour_start = that._conversations[0].conversation.hour_start;
        let user_me = that._conversations[0].conversation.user_me;
        let posts = that._conversations[0].conversation.posts;

        let hz_whatsapp_fake_conversation;

        let items = [];
        let result;
        result = `<div class="hz-whatsapp-fake-conversation" data-hour-init="${hour_start}" data-user-me="${user_me}">`;

        for(let i=0; i< posts.length;i++){
            result += `<div class="hz-whatsapp-fake-post" data-user-me="${posts[i].user==user_me ? true:false}" data-user="${posts[i].user}">`;
            let user=posts[i].user;
            let posts_user=posts[i].posts_user;
            for(let x=0; x < posts_user.length; x++){
                result +=  `<div class="hz-whatsapp-fake-content" data-seconds="${posts_user[x].seconds}">`;
                if(x==0) {
                    result += `<span data-user-me="${posts[i].user == user_me ? true : false}" class="hz-whatsapp-fake-user ${that._getUserData(user).color}">${user}</span>`;
                }

                result +=  `<div class="content-wrapper">
                            <span class="content-text">${posts_user[x].post_line}</span>
                            <span class="content-time">12:45 
                                <span class="content-tick content-tick_read" data-user-me="${posts[i].user == user_me ? true : false}"><i class="fa fa-check"></i><i class="fa fa-check"></i></span>
                            </span>
                            </div>
                            </div>`;
            };
            result += '</div>';
        };

        result = result + '</div>';

        this.element.html(result);

        return this.element;
        /*
        let items = [];
        $.each(posts, function (key, val) {
            items.push("<li id='" + key + "'>" + val + "</li>");
        });

        $("<ul/>", { "class": "my-new-list", html: items.join("") }).appendTo("body");
     */
    }




});
