#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char * keys[24] = {"hand1","hand2","grave1","grave2","deck1","deck2","Hand1","Hand2","Grave1","Grave2","Deck1","Deck2","h1","h2","g1","g2","d1","d2","H1","H2","G1","G2","D1","D2"};

int keyLength(int index)
{
    switch(index)
    {
    case 0:
    case 1:
    case 4:
    case 5:
    case 6:
    case 7:
    case 10:
    case 11:
        return 5;
    case 2:
    case 3:
    case 8:
    case 9:
        return 6;
    default:
        if(12<=index && index<24)
            return 2;
        else
        {
            printf("keyLength error %d\n",index);
            return -1;
        }
    }
}

int keyIndex(char*test,int start,int length)
{
    int i=0;
    int n=0;
    int ret=-1;

    for(;i<24 && ret==-1;i++)
    {
        n = start;

        if(length == keyLength(i))
        {
            ret = i;
            for(;n<start+length;n++)
            {
                //printf("[%c|%c]",test[n],keys[i][n]);
                if(test[n]!=keys[i][n-start] || (n-start)>=keyLength(i))
                {
                    ret=-1;
                    break;
                }
            }
        }

    }
    //n=start;
    //for(;n<start+length;n++)
    //    printf("%c",test[n]);
    //printf("\n");
    return ret;
}

int main(int argc, char**argv)
{

    if(argc == 2)
    {
        FILE* inf = fopen(argv[1],"r");
        if(inf==NULL)
        {
            printf("invalid argument: could not open input file '%s'\n",argv[1]);
            return (1);
        }
        char u2[256]="u2/";
        strcat(u2,argv[1]);
        FILE* outf = fopen(u2,"w");
        if(outf==NULL)
        {
            printf("invalid argument: could not open output file '%s'\n",u2);
            return (1);
        }
        char*buf=malloc(16384);

        int counter=0;
        while(fgets(buf,16384,inf) != NULL)
        {
            counter++;
            int n=0;
            int l=6;
            int k=0;
            for(;n<16384 && buf[n]!='\0';n++)
            {
                for(l=5;l>=1;l--)
                {
                    k=keyIndex(buf,n-l,l+1);
                    if(k != -1)
                    {
                        //printf("%d !\n",k);
                        k ^= 0x01;//toggle number
                        //printf("%d @\n",k);

                        int loc=n-l;
                        //printf("%d #\n",loc);
                        for(;loc<n+1;loc++)
                        {
                            //printf("%d<%d:",loc,n+1);
                            buf[loc]=keys[k][loc - (n-l)];
                        }
                        //puts("$");
                        break;
                    }
                }
            }
            n=0;if(buf[0]!='\0')for(;n<16384 && buf[n]!='\0';n++);
            fwrite(buf,1,n,outf);
        }
        return 0;
    }
    else
    {
        printf("invalid argument: must be a single filename \n");
        return (1);
    }
}
