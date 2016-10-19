import React from 'react';
import {Tabs, Tab} from 'react-bootstrap-tabs';

const Dashboard = React.createClass({

    getInitialState() {
        return {
            key: 1
        };
    },

    handleSelect(key) {
        var currentTab = key;

        Trello.members.get("me", function (member) {
            $("#fullName").text(member.fullName);
            var $content = $(".tab-content");
            $content.empty();
            console.log("xxxxx");
            if (currentTab === 0) {
                Trello.get("members/me/boards?key=" + Trello.key() + "&token=" + Trello.token(), function (boards) { 
                    $(boards).each(function (i, card) {
                        $("<a>").attr({href: card.url, target: "trello"})
                            .addClass("card")
                            .text(card.name).appendTo($content);
                    });
                });
            }
            if (currentTab === 1) {
                // is assigned to
                Trello.get("members/me/cards", function (cards) {

                    $(cards).each(function (i, card) {
                        $("<a>").attr({href: card.url, target: "trello"})
                            .addClass("card")
                            .text(card.name).appendTo($content);
                    });
                });
            } else {
                // is assigned to
                Trello.get("members/me/list", function (cards) {

                    $(cards).each(function (i, card) {
                        $("<a>").attr({href: card.url, target: "trello"})
                            .addClass("card")
                            .text(card.name).appendTo($content);
                    });
                });
            }
        });
    },

    render() {
        console.log("Render dashboard");
        return (
            <div>
                <div>Boards</div>
                <div><List prp /></div>
                <div>Cards</div>
            </div>
        );
    }
});

export default Dashboard;
