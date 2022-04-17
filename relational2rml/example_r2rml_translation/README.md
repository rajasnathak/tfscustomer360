# R2RML Implementation: Creating RDF from Tabular Data

## Prerequisites:

For converting your relational data into RDF data, you will need:
  1. A **input csv file** consisting of all your tabular data. This would be referenced for creating the triples.
  2. A **mapping file** which consists of instructions of the triple mapping relating the different columns of the tabular data.
     You will have to follow rules to create a triple map. A good resource to write a mapping file is W3C's [RDB to RDF Mapping Language](https://www.w3.org/TR/r2rml/).
  3. The **r2rml jar** to execute the mappings process.
  4. A **properties file** in which you can specify:
          *user*: username for the user to connect to the system
          *password*: password to verify the user connection
          *mapping file*: input file as mentioned above
          *output file*: output file as mentioned above
          *format*: format of the output file in RDF; the default format is Turtle (ttl).
          *connectionURL*: A JDBC connection to the URL to a database
          *filePerGraph*: flag that specifies if we want different graphs in different files. The default is "false"
          *baseIRI*: used in resolving relative IRIs produced by the R2RML mapping file.
          *CSVFiles*: a list of all the paths to the CSV files, all separated by semicolons.
          *prefixFile*: an RDf file from which name space prefixes can be reused.

## Example Properties File:
The following is an example of the contents of a properties file *properties_r2rml.properties*. The user *Jane* has a input mapping files with triples in her *mapping.ttl* and
has specified her output file to be *output.file* in the Turtle output format:

`user = Jane`
`password = somepassword`
`mappingFile = mapping.ttl`
`outputFile = output.ttl`
`format = TURTLE`

## Execution:

To execute R2RML processor give the command with your properties file as follows:

`$ java -jar r2rml.jar config.properties`

## References
[1] C. Debruyne and D. O'Sullivan. R2RML-F: Towards Sharing and Executing Domain Logic in R2RML Mappings. In Proceedings of the Workshop on Linked Data on the Web,
LDOW 2016, co-located with the 25th International World Wide Web Conference (WWW 2016), Montreal, Canada, April 12th, 2016, 2016
[2] (https://github.com/chrdebru/r2rml)
[3] Get the jar from [Apache Maven Project](https://maven.apache.org/plugins/maven-shade-plugin/index.html)
