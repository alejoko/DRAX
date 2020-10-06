const getLeadershipTeam = (companyId) => {
    return {
        "company_id": companyId,
        "company_name": "Drax Group",
        "leadership_team": {
            "2": {
                "role": "Chair",
                "appointed": []
            },
            "17": {
                "role": "CEO",
                "appointed": [
                    {
                        "person_name": "Will Gardiner",
                        "person_id": 563386
                    }
                ]
            },
            "20": {
                "role": "CFO",
                "appointed": [
                    {
                        "person_name": "Andy Skelton",
                        "person_id": 160675
                    }
                ]
            },
            "23": {
                "role": "CCO",
                "appointed": []
            },
            "26": {
                "role": "CTO",
                "appointed": []
            },
            "29": {
                "role": "CRO",
                "appointed": []
            },
            "32": {
                "role": "COO",
                "appointed": [
                    {
                        "person_name": "John Watts",
                        "person_id": 1919855
                    }
                ]
            },
            "35": {
                "role": "CMO",
                "appointed": []
            },
            "38": {
                "role": "CISO",
                "appointed": []
            },
            "41": {
                "role": "CHRO",
                "appointed": [
                    {
                        "person_name": "Sarah Branagan",
                        "person_id": 5903663
                    }
                ]
            },
            "44": {
                "role": "Chief Product Officer",
                "appointed": []
            },
            "47": {
                "role": "Chief Strategy Officer",
                "appointed": []
            },
            "50": {
                "role": "Managing Director",
                "appointed": [
                    {
                        "person_name": "Prodipta Bhattacharya",
                        "person_id": 827755
                    },
                    {
                        "person_name": "James Kahn",
                        "person_id": 1250728
                    },
                    {
                        "person_name": "Paul Sheffield",
                        "person_id": 2905517
                    }
                ]
            },
            "83": {
                "role": "Founder",
                "appointed": []
            },
            "89": {
                "role": "Chief Legal Counsel",
                "appointed": []
            }
        }
    };
};

exports.getLeadershipTeam = getLeadershipTeam;