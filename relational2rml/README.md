# All about TFS-Customer 360 Database

In this document, all the steps that have been taken from converting the Tabular Data available to us to the RDF Graphs we converted it into are described.

## Reading the Data

Each node in the final graph is defined by:

- **The triple that it is a part of**: Represented by nodes connected by lines
- **The overarching category it belongs to**: Represented by the color of the node

So even before connecting up triples, the raw tabular data was divided into the following categories to meaningfully divide the data:

>**Party**: Data pertaining to individuals or organizations directly involved or interested in TFS.
>
>**Asset**: Data pertaining to the identification of assets owned by parties associated with TFS.
>
>**Product**: Data indicating the Product type - LSE, RTL, or BLN. (We need to ask what each of these codes mean and put that here.) 
>
>**Alternate ID**: Data pertaining to alternate identifiers of the party. It also includes contact and contract information related to the party.
>
>**Phone**: Data pertaining to the phone contacts of the party. The various phone categories are indicated through following codes: 
>>	HLPH: Home Landline Phone
>>	HMPH: Home Mobile Phone
>>	OMPH: Other Mobile Phone
>>	WFPH: Work Fax Phone
>>	WLPH: Work Landline Phone
>
>**Other Master Data**: Any other miscellaneous data pertaining to the personal information of the party including Military Duty and Banking Information.
>
>**Borrower**: Data pertaining to the party relationship, and all the borrower-flag information related to the party's account with TFS.
>
>**Address**: Data pertaining to the physical address associated with the party's account with TFS.
>
>**Email**: Data pertaining to the email address, its validity, and most recent updates of the party.

## Creating Graph-Data Protypes

Once we had divided and categorized the data, the next step was to make the graphical connections between various data attributes, thinking about how the end
 result would like. This included a lot of study and analysis of the data and intutively creating a rough draft of the end result called "Graph-Data Prototypes". 
 
 This link shows you all our graph-data prototypes: [Graph-Data Prototypes](https://drive.google.com/drive/folders/1iZj0VSKN38txj5Xlfq-sQVAXWC2U02b8?usp=sharing)
 
 Next, we needed a method to convert this tabular data into some sort of RML lanaguage which could be ingested by Neptune. For this we used R@RML-F. This separate README goes into the details of R2RML-F for a R2RML implementation: [R2RML-F](https://github.com/rajasnathak/tfscustomer360/blob/main/relational2rml/example_r2rml_translation/README)
 
## How We Implemented The R2RML: 
 
 The R2RML-F implementation required the following:
 
 ##### Input CSV file: 
 Each time we needed to load the data/part of the data, we extracted the csv file/part of the csv from the tabular data provided to us.
 
 ##### Mapping File:
 The major part of creation of final RML files was creating mapping files. Think of mapping file as a set of rules according to which all the data from the csv file will be picked and arranged into triples.
 
## Creating a Mapping File:

#### Specifying Prefixes

We wrote our mapping files in ttl or turtle. Thus, the mapping files begin with the specification of prefixes, just as any other turtle file.

### Triple Maps

The rest of the mapping files are triple maps. These triple maps contain **Subject Maps** and **Predicate Object Maps**. For each triples map one subject is specified. In our case our primary subject is **Customer Full Name**, to which all layer one or **L1** nodes are connected. The L1 nodes can be either drilled down or not. All those nodes which have the option to drill down can be further drilled down to layer two or **L2** and so on.

All nodes connected to the Customer Name form L1 whether or not they have the option to drill down and are specified with the Predicate Object Map in the first Triple Map. The only difference to be considered while forming Predicate Object Map for drilled down and non-drilled down nodes is that while all non-drilled down nodes are specified as a column (rr:column) in the Object Map (withtin the Predicate Object Map), the drilled down nodes are specified as an IRI (rr:template). This is because drill down nodes are to have their own tripple maps with predicates and objects. In that case, they will become the subject. And subjects must be IRIs. 

Another important thing to note while writing the L1 Predicate Object Maps is the category of the node. The way we color coded the category information was specifying the catgory in the predicate which could provide the data into which each L1 Object could fall. This we specified in the predicate IRI using *%tensones* suffix after the predicate IRI specified. Note that we had only 9 categories and so *ones* goes from 0 to 9 and the *tens* is always 0. For example a predicate *Other_phone* from *www.example.com* falling in category 03 will look like:

`rr:predicate ex:Other_phone%03;`

#### Creating IRIs

It is important to note how we created IRIs, especially for the drill down nodes. Since the data had repetitive values which were not unique. Reusing the IRIs could lead to problems in the data graphs. So it is important to understand that we followed a specific convention when it came to specifying IRIs for drill down nodes. The prefix of the IRI can be any IRI you prefer, but for the data that followed we first included the data and then the parent node it came from. So, for instance, if we had data about the **Other Phones** of the customer which was represented by column **PTYOMPH** in the tabular data for the Customer Named corresponding to the **CUSTOMERFULLNM** in the tabular data, then the Object Map would look like:

` rr:objectMap [ rr:template "http://example.com/{PTYOMPH}/{CUSTOMERFULLNM}" ];`

And now we know that this data is unique and use it to populate our data graph. And this is how you create all other triples. 
 
#### Properties File

Once you have the Input file and Mapping file, you can specify these in the Properties File along with the data format in which you want the resulting RDF file. More information can be found in the R2RML implementation link mentioned above. 

Once you have everything you can execute the jar with the properties file and that will generate an RDF output file which you can load into Neptune and create data graphs with.
 
