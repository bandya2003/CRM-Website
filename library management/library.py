import os
def Return():
    C="Y"
    while(C=="Y"):
        PI=0        
        F=open("Return.txt","r")
        X=F.readline()
        while X:
            PI=PI+1
            X=F.readline()
        F.close()
        F=open("Return.txt","a+")
        PD=str(input("\t\t\t enter Returned Date          :"))
        VN=str(input("\t\t\t enter Student Name            :"))
        VPno=str(input("\t\t\t enter Student Phno.           :"))
        MI=str(input("\t\t\t enter Book Id              :"))
        Q=int(input("\t\t\t enter Quantity               :"))
        F.write(str(PI)+":"+PD+":"+VN+":"+VPno+":"+MI+":"+str(Q)+"\n")
        F.close()
        Z=open("Stock.txt","r")
        k=Z.readline()
        k=Z.readline()
        N=[]
        while k:
            A=k.split(":")
            N.append(A[0])
            k=Z.readline()
        Z.close()
        Z=open("Stock.txt","r")
        Y=open("Temp.txt","w")
        m=Z.readline()
        Y.write(m)
        m=Z.readline()
        while m:
            B=m.split(":")
            if(MI.strip()==B[0].strip()):
                B[3]=str(int(B[3])+Q)
                Y.write((":".join(B)+"\n"))
            else:
                Y.write((":".join(B)))
            m=Z.readline()
        C=input("\t\t\t You Want To Continue(Y/N)    :")
        Y.close()
        Z.close()
        os.remove("Stock.txt")
        os.rename("Temp.txt","Stock.txt")
def ReturnModification():
    F=open("Return.txt","r+")
    B=open("ReturnTemp.txt","w+")
    PI=str(input("\t\t\t Please enter Return id of \n\t\t\t Phone Record you want to modify"))
    k=F.readline()
    while k:
        A=k.split(":")
        if(A[0].strip()==PI):
            PD=str(input("\t\t\t enter Returned Date          :"))
            VN=str(input("\t\t\t enter Student Name            :"))
            VPno=str(input("\t\t\t enter Student Phno.           :"))
            MI=str(input("\t\t\t enter Book Id              :"))
            Q=int(input("\t\t\t enter Quantity               :"))
            K=open("Stock.txt","r")
            S=open("Stocktemp.txt","w")
            t=K.readline()
            while(t):
                c=t.split(":")
                t=K.readline()
                if(A[4]==c[0]):
                    c[3]=str(int(c[3])-int(A[5]))+"\n"
                    S.write((":".join(c)))
                else:
                    S.write((":".join(c)))
            K.close()
            S.close()
            os.remove("Stock.txt")
            os.rename("Stocktemp.txt","Stock.txt")
            B.write(str(PI)+":"+PD+":"+VN+":"+VPno+":"+MI+":"+str(Q)+"\n")
            K=open("Stock.txt","r")
            S=open("Stocktemp.txt","w")
            t=K.readline()
            while(t):
                c=t.split(":")
                t=K.readline()
                if(MI==c[0]):
                    c[3]=str(int(c[3])+int(Q))+"\n"
                    S.write((":".join(c)))
                else:
                    S.write((":".join(c)))
            K.close()
            S.close()
            os.remove("Stock.txt")
            os.rename("Stocktemp.txt","Stock.txt")
        else:
            B.write(k)
        k=F.readline()
    B.close()
    F.close()
    os.remove("Return.txt")
    os.rename("ReturnTemp.txt","Return.txt")
def Returndetail():
    F=open("Return.txt","r")
    print("*******************************************************************************************************************************************************************")
    k=F.readline()
    A=k.split(":")
    for i in range(0,len(A)):
        print(A[i].strip(),end=" "*(15-len(A[i])))
    print()
    print("*******************************************************************************************************************************************************************")
    F.close()
    F=open("Return.txt","r")
    k=F.readline()
    k=F.readline()
    while k:
        A=k.strip()
        A=A.split(":")
        for i in range(0,len(A)):
            print(A[i],end=" "*(15-len(A[i])))
        print()    
        k=F.readline()
    F.close()
def Stockdetail():
    F=open("Stock.txt","r")
    print("********************************************************************************************************************************************************************")
    k=F.readline()
    A=k.split(":")
    for i in range(0,len(A)):
        print(A[i].strip(),end=" "*(15-len(A[i])))
    print()
    print("********************************************************************************************************************************************************************")
    F.close()
    F=open("Stock.txt","r")
    k=F.readline()
    k=F.readline()
    while k:
        A=k.split(":")
        for i in range(0,len(A)):
            print(A[i].strip(),end=" "*(15-len(A[i])))
        print()    
        k=F.readline()
    F.close()
def issuedetail():
    F=open("issue.txt","r")
    print("***************************************************************************************")
    k=F.readline()
    A=k.split(":")
    for i in range(0,len(A)):
        if(i==4 or i==5 or i==6 or i==0 or i==7):
            print(A[i].strip(),end=" "*(8-len(A[i])))
        else:
            print(A[i].strip(),end=" "*(16-len(A[i])))
    print()
    print("***************************************************************************************")
    F.close()
    F=open("issue.txt","r")
    k=F.readline()
    k=F.readline()
    while k:
        A=k.strip()
        A=A.split(":")
        for i in range(0,len(A)):
            if(i==4 or i==5 or i==6 or i==0 or i==7):
                print(A[i].strip(),end=" "*(8-len(A[i])))
            else:
                print(A[i].strip(),end=" "*(16-len(A[i])))
        print()    
        k=F.readline()
    F.close()
def issueModification():
    F=open("issue.txt","r+")
    L=open("issueTemp.txt","w+")
    SI=str(input("\t\t\t Please enter Book id of \n\t\t\t Phone Record you want to modify"))
    k=F.readline()
    while k:
        A=k.split(":")
        if(A[0].strip()==SI):
            SD=str(input("\t\t\t enter issue Date              :"))
            CN=str(input("\t\t\t enter Student Name          :"))
            Cno=str(input("\t\t\t enter Student Phone number  :"))
            MI=str(input("\t\t\t enter Book Id              :"))
            Q=str(input("\t\t\t enter Quantity               :"))
            K=open("Stock.txt","r")
            S=open("Stocktemp.txt","w")
            t=K.readline()
            while(t):
                c=t.split(":")
                t=K.readline()
                if(A[4]==c[0]):
                    c[3]=str(int(c[3])+int(A[5]))+"\n"
                    S.write((":".join(c)))
                else:
                    S.write((":".join(c)))
            K.close()
            S.close()
            os.remove("Stock.txt")
            os.rename("Stocktemp.txt","Stock.txt")
            X=open("Stock.txt","r")
            t=X.readline()
            while(t):
                c=t.split(":")
                if c[0].strip()==MI:
                    q=c[3]
                    if(int(Q)>int(q)):
                        print("\t\t\t Book is out of issued")
                        L.write(k)
                    else:
                        L.write(str(SI)+":"+SD+":"+CN+":"+Cno+":"+MI+":"+Q+"\n")
                t=X.readline()
            X.close()
            K=open("Stock.txt","r")
            S=open("Stocktemp.txt","w")
            t=K.readline()
            while(t):
                c=t.split(":")
                t=K.readline()
                if(MI==c[0]):
                    c[3]=str(int(c[3])-int(Q))+"\n"
                    S.write((":".join(c)))
                else:
                    S.write((":".join(c)))
            K.close()
            S.close()
            os.remove("Stock.txt")
            os.rename("Stocktemp.txt","Stock.txt")
        else:
            L.write(k)
        k=F.readline()
    F.close()
    L.close()
    os.remove("issue.txt")
    os.rename("issueTemp.txt","issue.txt")
def issue():
    c="Y"
    K=["\t\t\t Book Id:Student Name:Book Name:Quantity\n"]
    while(c=="Y"):
        SI=0
        F=open("issue.txt","r")
        k=F.readline()
        while k:
            SI=SI+1
            k=F.readline()
        F.close()
        F=open("issue.txt","+a")
        Z=open("Stock.txt","r")
        X=open("Stocktemp.txt","w")
        SD=str(input("\t\t\t enter issue Date              :"))
        CN=str(input("\t\t\t enter issue Name          :"))
        Cno=str(input("\t\t\t enter issue Phone number  :"))
        MI=str(input("\t\t\t enter Book Id              :"))
        Q=str(input("\t\t\t enter Quantity               :"))
        k=Z.readline()
        X.write(k)
        k=Z.readline()
        while k:
            A=k.strip()
            A=A.split(":")
            if(A[0].strip()==MI.strip() and int(A[3])<int(Q)):
                print("\t\t\t Book is out of issued")
                X.write((":".join(A)+"\n"))
            elif(A[0].strip()==MI.strip() and int(A[3])>=int(Q)):
                A[3]=str(int(A[3])-int(Q))
                X.write((":".join(A)+"\n"))
                F.write(str(SI)+":"+SD+":"+CN+":"+Cno+":"+MI+":"+Q+"\n")
                K.append(MI+":"+CN+":"+A[1]+":"+Q+"\n")                
            elif(A[0].strip()!=MI.strip()):
                X.write((":".join(A)+"\n"))
            k=Z.readline()
        Z.close()
        F.close()
        X.close()
        os.remove("Stock.txt")
        os.rename("Stocktemp.txt","Stock.txt")
        c=input("\t\t\t You Want To Continue(Y/N)    :")
    if(len(K)>=2):
        for i in K:
            A=i.strip()
            A=A.split(":")
            if(i=="\t\t\t Book Id:Student Name:Book Name:Quantity:Price:Total\n"):
                print("****************************************************************************************")
                for j in range(0,len(A)):
                    print(A[j],end=" "*(15-len(A[j])))
                print()
                print("****************************************************************************************")
            else:
                for j in range(0,len(A)):
                    print(A[j],end=" "*(15-len(A[j])))
                print()
        K=["\t\t\t Book Id:Student Name:Book Name:Quantity:Price:Total\n"]
def Startmenu():
    while(True):
        print("\t\t ------------ Select option ----------- ")
        print("\t\t 1. ISSUE")
        print("\t\t 2. RETURN")
        print("\t\t 3. STOCK DETAIL")
        print("\t\t 4. EXIT PROGRAM")
        print("\t\t ---------------------------------------")
        ch=int(input("\t\t Select Option "))
        if ch==1:
            while(True):
                print()
                print("\t\t\t ISSUE MODULE\t")
                print("\t\t\t ************ Select option *********** ")
                print("\t\t\t 1. BOOK ISSUED")
                print("\t\t\t 2. BOOK DETAILS")
                print("\t\t\t 3. ISSUE MODIFICATION")
                print("\t\t\t 4. EXIT PROGRAM")
                print("\t\t\t ************************************** ")
                H=int(input("\t\t\t Select Option "))
                if(H==1):
                    issue()
                elif(H==2):
                    issuedetail()
                elif(H==3):
                    issueModification()
                elif H==4:
                    break
                else:
                    print("\n\t\t\t ****************************\n\t\t\t Invalid choice. Select Again\n\t\t\t ****************************\n")
        elif ch==2:
            while(True):
                print()
                print("\t\t\t Return MODULE\t")            
                print("\t\t\t ************ Select option *********** ")
                print("\t\t\t 1. Book Returned")
                print("\t\t\t 2. Book DETAILS")
                print("\t\t\t 3. Return MODIFICATION")
                print("\t\t\t 4. EXIT PROGRAM")
                print("\t\t\t ***************************************")
                H=int(input("\t\t\t Select Option "))
                if(H==1):
                    Return()
                elif(H==2):
                    Returndetail()
                elif(H==3):
                    ReturnModification()
                elif(H==4):
                    break
                else:
                    print("\n\t\t\t ****************************\n\t\t\t Invalid choice. Select Again\n\t\t\t ****************************\n")
        elif ch==3:
            Stockdetail()
        elif ch==4:
            break
        else:
            print("\n\t\t\t ****************************\n\t\t\t Invalid choice. Select Again\n\t\t\t ****************************\n")
print("\n\n\t\t-------------- WELCOME TO LIBRARY  MANAGEMENY SYSTEM-------------------")
print("\t\t\t\t Prepared by KANISHKA SRIVASTAVA, STD XII, CBSE ")
print("\t\t\tGuided by Mr SANJAY KUMAR SINHA,Teacher, Computer Science ")
k=0
while (k<3):
    UserNm=input("\t\t USER NAME         : ")
    Passwd=input("\t\t  Password         : ")
    if UserNm=="Kanishka" and Passwd=="4321":
        print("\n\n\t\t WELCOME TO LIBRARY MANAGEMENY SYSTEM")
        Startmenu()
        break
    else :
         k=k+1
         print("\t\t\tInvalid user name or password.\n\t\t\t Chance remaining " ,3-k)
print("\t\t\t---------Thank you ")
