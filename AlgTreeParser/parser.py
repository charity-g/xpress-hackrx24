import pandas as pd
import numpy as np
import csv
import json
from typing import List

class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

#%% HELPER FUNCTIONS

def not_whitespace(string):
    string = string.replace(string, '')
    string = string.replace(string, '\n')
    string = string.replace(string, '\r')
    return string == ''

"""
Returns [] of String where each element is seperated by:
 a "- {info} \n" within the original csv_string
"""
def parseCell_dash_space(cell_string):
    return cell_string.split('- ')[1:]

def parseCell_comma(cell_string):
    return cell_string.split(',')

def parse_normalNodeButtons(row):
    buttons = []
    
    answers = parseCell_dash_space(str(row['Answers']))
    rids = parseCell_comma(str(row['RIDs']))
    buttonTypes = parseCell_comma(str(row['buttonTypes'])) if len(str(row['buttonTypes'])) > 4 else False
    notes = parseCell_dash_space(str(row['Notes'])) if len(str(row['Notes'])) > 4 else False
    warnings = parseCell_dash_space(str(row['Warnings'])) if len(str(row['Warnings'])) > 4 else False
    
    
    if len(answers) != len(rids):
        raise Exception(f"answers not equal to links_rids_imgPaths\n{answers}\n{rids}")
    if notes and len(answers) != len(notes):
        raise Exception(f"notes not equal to answers\n{notes}\n{answers}")
    if warnings and len(answers) != len(warnings):
        raise Exception(f"warnings not equal to answers\n{warnings}\n{answers}")
    if buttonTypes and len(answers) != len(buttonTypes):
        raise Exception(f"buttonTypes not equal to answers\n{buttonTypes}\n{answers}")
    
    for i in range(len(answers)):
        button = {}
        button['text'] = answers[i]
        button['rid'] = rids[i]
        button['type'] = "InternalRIDButton"
        if buttonTypes:
            if buttonTypes[i] == 'popup':
                button['type'] = "ProductLeafButton"
            elif buttonTypes[i] == 'pageLink':
                button['type'] = "PageLinkButton"
        if notes and not_whitespace(notes[i]):
            button['note'] = notes[i]
        if warnings and not_whitespace(warnings[i]):
            button['warning'] = warnings[i]
            
        buttons.append(button)
        
    return buttons


#INVAR: has at least one group
def parse_groupedNodeGroups(row):
    buttons = parse_normalNodeButtons(row)
    for b in buttons:
        if b['text'][0:3] == '<> ':
            b['type'] = 'buttonGroupHeader'
            b['text'] = b['text'][3:]
                
    return buttons
    

def parse_yesNoRid(row):
    result = {}
    answers = parseCell_dash_space(str(row['Answers']))
    rids = parseCell_comma(str(row['RIDs']))
    if len(answers) != len(rids):
        raise Exception(f"rids not equal to answers\n{rids}\n{answers}")
    if answers[0][:3].lower() == 'yes':
        # redirects[0] == yes RID, redirects[1] = no RID
        result['yes'] = rids[0]
        result['no'] = rids[1]
    else:
        # redirects[1] == yes RID, redirects[0] = no RID
        result['yes'] = rids[1]
        result['no'] = rids[0]
    return result
        
def parse_ColdFluSymptomsSelections(row):
    buttons = []
    answers = parseCell_dash_space(row['Answers'])
    for i in range(len(answers)):
        buttons.append({
            'type': 'ColdFluSymptomsSelectionButton',
            'text': answers[i],
            'selectId': i
        })
    return buttons

#%% PROGRAM

dt_csv = pd.read_csv("./xpressdt.csv")
dt_csv['ID'] = dt_csv['ID'].replace(np.NaN, -1)
dt_csv['ID'] = dt_csv['ID'].astype(int)
dt_csv['startingSymptom'] = dt_csv['startingSymptom'].replace(np.NaN, -1)

json_d = {
         }

for row_index, row in dt_csv.iterrows():    
    if row_index == 44:
        pass
    row_id = row['ID']
    row_type = row['rowType']
    node = {
        "isLeaf": row["isLeaf"],
        "startingSymptom": row["startingSymptom"] if row['startingSymptom'] != -1 else False,
        "type": row_type,
        "q": row["prompt them"]
        }
    try:
        if row_type == 'Buffer':
            continue #don't add to data
        elif row_type == 'Map':
            node['map'] = row['RIDs']
        elif row_type == 'normalNode':
            if str(row['Answers']) == 'nan':
                node['buttons'] = []
            else:
                node['buttons'] = parse_normalNodeButtons(row)
        elif row_type == 'yesNoNode':
            rid = parse_yesNoRid(row)
            node['yesRID'] = rid['yes']
            node['noRID'] = rid['no']
            node['selections'] = parseCell_dash_space(str(row['yesNoSelections']))
        
        elif row_type == 'groupedNode':
            node['buttons'] = parse_groupedNodeGroups(row)
        elif row_type == 'MACSReferralNode':
            pass
        elif row_type == 'ColdFluSymptomsSelectionNode':
            node["buttons"] = parse_ColdFluSymptomsSelections(row)
            node["selectList"] = json.loads(str(row['RIDs']))
        elif row_type == 'yesNoDehydrationNode': #TODO make data struct
            node["buttons"] = parseCell_dash_space(str(row['yesNoSelections']))
            node['rids'] = json.loads(str(row['RIDs']))
        else:
            raise Exception(f"row_type is wrong: {row_type}")
            
        if str(row['redFlagButton?']) != 'nan':
            node['redFlagButton'] = json.loads(str(row['redFlagButton?']))
        
        json_d[row_id] = node
    except Exception as e:
        print(f"{bcolors.WARNING}ERROR- row {row['ID']}: {e}{bcolors.ENDC}")
        


# %%
jsonFilePath = "data.json"
# Open a json writer, and use the json.dumps() function to write data
with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
    jsonf.write(json.dumps(json_d, indent=4))

#%% =========

#%% OOD

def OOD():
    
# BUTTONS ====================================
    PageLinkButton = {
     "type":    "PageLinkButton",
     "text":    "mandatory", #str
     "rid" :    "mandatory", #str of absolute or relative value
     "note":    "optional",  #str not empty or whitespace
     "warning": "optional"   #str not empty or whitespace
     }
    
    InternalRIDButton = {
     "type":    "InternalRIDButton",
     "text":    "mandatory", #str
     "rid" :    "mandatory", #str to valid rid
     "note":    "optional",  #str not empty or whitespace
     "warning": "optional"   #str not empty or whitespace
     }
    
    ProductLeafButton = {
     "type":    "ProductLeafButton",
     "text":    "mandatory", #str
     "rid" :    "mandatory", #str of absolute or relative value
     "note":    "optional",  #
     "warning": "optional"   #
     }
    
    ColdFluSymptomsSelectionButton = {
     "type":     "ColdFluSymptomsSelectionButton",
     "text":     "mandatory", #str
     "selectId": "mandatory", #int
    }
    
    redFlagButton = {
       "type"    : "redFlagButton",
       "redFlagQ": "mandatory",
       "text"    : "mandatory",
       "rid"     : "mandatory"
    }
    
    groupButton = {
        "type"   : "buttonGroupHeader",
        "text"   : "mandatory",
        "note"   : "optional",  
        "warning": "optional"   
    }
    
    # Group ====================================
    Group = {
        "heading": "mandatory",
        "buttons": "mandatory" #list of button
        }
    
    # Nodes ====================================
    normalNode = {
     "isLeaf":  "mandatory", #bool
     "isStartingSymptom":  "mandatory", #bool
     "type"   : "normalNode",
     "q"      : "mandatory",
     "buttons": "mandatory", #list of button
     "redFlagButton": "optional"
     }
    
    
    yesNoNode = {
     "isLeaf":  False, #bool
     "isStartingSymptom":  "mandatory", #bool
     "type"      : "yesNoNode",
     "q"         : "mandatory", 
     "yesRID"    : "mandatory", 
     "noRID"     : "mandatory", 
     "selections": "mandatory" # list of string
    }
    
    groupedNode = {
     "isLeaf":  False, #bool
     "isStartingSymptom":  "mandatory", #bool
     "type"   : "groupedNode",
     "q"      : "mandatory",
     "buttons" : "mandatory", #list of button
     "redFlagButton": "optional"
    }
    
    MACSReferralNode = {
     "isLeaf":  True, #bool
     "isStartingSymptom": "mandatory", #bool
     "type"   : "MACSReferralNode"
    }
    
    ColdFluSymptomsSelectionNode = {
     "isLeaf":  False, #bool
     "isStartingSymptom": False, #bool
     "type"      : "ColdFluSymptomsSelectionNode",
     "q"         : "mandatory",
     "buttons"   : "mandatory",  #list of ColdFluSymptomsSelectionButton
     "selectList": "mandatory"
    }