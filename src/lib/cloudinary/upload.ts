export async function uploadToCloudinary(file: File): Promise<string> {
  const cloudName = "dlebamtuh";
  const uploadPreset = "abufa_products";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Upload gambar ke Cloudinary gagal.");
  }

  const data = (await response.json()) as { secure_url?: string };

  if (!data.secure_url) {
    throw new Error("Respon Cloudinary tidak berisi secure_url.");
  }

  return data.secure_url;
}
