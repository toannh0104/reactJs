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
            var $cards = $(".tab-content");
            $cards.empty();
            if (currentTab === 1) {
                // is assigned to
                Trello.get("members/me/cards", function (cards) {

                    $(cards).each(function (i, card) {
                        $("<a>").attr({href: card.url, target: "trello"})
                            .addClass("card")
                            .text(card.name).appendTo($cards);
                    });
                });
            } if (currentTab === 2){
                Trello.get("members/me/cards?filter=closed", function (cards) {
                    // var $cards = $(".tab-content");
                    // $cards.empty();
                    $(cards).each(function (i, card) {
                        $("<a>").attr({href: card.url, target: "trello"})
                            .addClass("card")
                            .text(card.name).appendTo($cards);
                    });
                });
            }else{
                Trello.get("members/me/boards?key="+Trello.key()+"&token="+Trello.token(), function (cards) {
                    // var $cards = $(".tab-content");
                    // $cards.empty();
                    $(cards).each(function (i, card) {
                        $("<a>").attr({href: card.url, target: "trello"})
                            .addClass("card")
                            .text(card.name).appendTo($cards);
                    });
                });
            }
        });
    },

    render() {
console.log("Render dashboard");
        return (
            <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="trello-react">
                <Tab label="Boards" eventKey={3} title="Boards">No boards content</Tab>
                <Tab label="Assigned" eventKey={1} title="Assigned">No assigned content</Tab>
                <Tab label="Closed" eventKey={2} title="Closed">No closed content</Tab>
            </Tabs>
        );
    }
});

export default Dashboard;
