import code_sense
import code_sense_utils

# Create an instance of CodeBaseAnalyzer
analyzer = code_sense.CodeBaseAnalyzer()

# Analyze the project
project_data = analyzer.analyze_project()
print("Project Data:")
for file_data in project_data:
    print(file_data)

# Create an instance of CodeRelationshipMapper
mapper = code_sense_utils.CodeRelationshipMapper(project_data)

# Map the relationships
graph = mapper.map_relationships()
print("\nGraph:")

# Print the graph
mapper.print_graph(graph)

# Test get_file_dependencies
if len(project_data)>0:
    file_path = project_data[0]['file_path']

    dependencies = mapper.get_file_dependencies(graph, file_path)
    print(f"\nDependencies of {file_path}:")
    for dep in dependencies:
        print(dep)